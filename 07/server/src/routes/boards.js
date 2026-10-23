import { Router } from 'express'
import { nowIso, withTransaction } from '../db.js'
import { DEFAULT_LISTS, validateBoardName, validateListName } from '../../../shared/cards.js'
import {
  getBoardDetail,
  getBoardRow,
  getMemberRole,
  listBoardsForUser,
} from '../repos.js'

function parseId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function requireMembership(db, boardId, userId) {
  const role = getMemberRole(db, boardId, userId)
  return role
}

export function createBoardsRouter({ db, requireAuth }) {
  const router = Router()
  router.use(requireAuth)

  router.get('/', (req, res) => {
    res.json({ boards: listBoardsForUser(db, req.user.id) })
  })

  router.post('/', (req, res) => {
    const { name } = req.body ?? {}
    const error = validateBoardName(name)
    if (error) return res.status(400).json({ error })

    const createdAt = nowIso()
    const boardId = withTransaction(db, () => {
      const result = db
        .prepare('INSERT INTO boards (name, owner_id, created_at) VALUES (?, ?, ?)')
        .run(String(name).trim(), req.user.id, createdAt)
      const id = Number(result.lastInsertRowid)
      db.prepare(
        'INSERT INTO board_members (board_id, user_id, role, created_at) VALUES (?, ?, ?, ?)',
      ).run(id, req.user.id, 'owner', createdAt)

      const insertList = db.prepare(
        'INSERT INTO lists (board_id, title, status_key, position, created_at) VALUES (?, ?, ?, ?, ?)',
      )
      DEFAULT_LISTS.forEach((list, index) => {
        insertList.run(id, list.title, list.status_key, index, createdAt)
      })
      return id
    })

    const board = getBoardDetail(db, boardId)
    res.status(201).json({ board: { ...board, role: 'owner' } })
  })

  router.get('/:boardId', (req, res) => {
    const boardId = parseId(req.params.boardId)
    if (!boardId) return res.status(404).json({ error: '看板不存在' })

    const board = getBoardRow(db, boardId)
    if (!board) return res.status(404).json({ error: '看板不存在' })

    const role = requireMembership(db, boardId, req.user.id)
    if (!role) return res.status(403).json({ error: '你沒有權限存取此看板' })

    res.json({ board: { ...getBoardDetail(db, boardId), role } })
  })

  router.patch('/:boardId', (req, res) => {
    const boardId = parseId(req.params.boardId)
    if (!boardId) return res.status(404).json({ error: '看板不存在' })
    const board = getBoardRow(db, boardId)
    if (!board) return res.status(404).json({ error: '看板不存在' })
    if (board.owner_id !== req.user.id) {
      return res.status(403).json({ error: '只有看板擁有者可以修改看板' })
    }

    const { name } = req.body ?? {}
    const error = validateBoardName(name)
    if (error) return res.status(400).json({ error })

    db.prepare('UPDATE boards SET name = ? WHERE id = ?').run(String(name).trim(), boardId)
    res.json({ board: { ...getBoardDetail(db, boardId), role: 'owner' } })
  })

  router.delete('/:boardId', (req, res) => {
    const boardId = parseId(req.params.boardId)
    if (!boardId) return res.status(404).json({ error: '看板不存在' })
    const board = getBoardRow(db, boardId)
    if (!board) return res.status(404).json({ error: '看板不存在' })
    if (board.owner_id !== req.user.id) {
      return res.status(403).json({ error: '只有看板擁有者可以刪除看板' })
    }
    db.prepare('DELETE FROM boards WHERE id = ?').run(boardId)
    res.status(204).end()
  })

  router.post('/:boardId/lists', (req, res) => {
    const boardId = parseId(req.params.boardId)
    if (!boardId) return res.status(404).json({ error: '看板不存在' })
    const board = getBoardRow(db, boardId)
    if (!board) return res.status(404).json({ error: '看板不存在' })
    if (!requireMembership(db, boardId, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限修改此看板' })
    }

    const { title } = req.body ?? {}
    const error = validateListName(title)
    if (error) return res.status(400).json({ error })

    const max = db
      .prepare('SELECT COALESCE(MAX(position), -1) AS max FROM lists WHERE board_id = ?')
      .get(boardId).max
    const result = db
      .prepare('INSERT INTO lists (board_id, title, status_key, position, created_at) VALUES (?, ?, ?, ?, ?)')
      .run(boardId, String(title).trim(), null, Number(max) + 1, nowIso())

    const list = db.prepare('SELECT * FROM lists WHERE id = ?').get(Number(result.lastInsertRowid))
    res.status(201).json({ list: { ...list, cards: [] } })
  })

  router.post('/:boardId/members', (req, res) => {
    const boardId = parseId(req.params.boardId)
    if (!boardId) return res.status(404).json({ error: '看板不存在' })
    const board = getBoardRow(db, boardId)
    if (!board) return res.status(404).json({ error: '看板不存在' })
    if (board.owner_id !== req.user.id) {
      return res.status(403).json({ error: '只有看板擁有者可以邀請成員' })
    }

    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    if (!email) return res.status(400).json({ error: '請輸入成員的電子郵件' })
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user) return res.status(404).json({ error: '找不到此電子郵件對應的使用者' })

    const existing = db
      .prepare('SELECT 1 AS found FROM board_members WHERE board_id = ? AND user_id = ?')
      .get(boardId, user.id)
    if (existing) return res.status(409).json({ error: '此使用者已是看板成員' })

    db.prepare(
      'INSERT INTO board_members (board_id, user_id, role, created_at) VALUES (?, ?, ?, ?)',
    ).run(boardId, user.id, 'collaborator', nowIso())

    res.status(201).json({
      member: { id: user.id, name: user.name, email: user.email, role: 'collaborator' },
    })
  })

  router.delete('/:boardId/members/:userId', (req, res) => {
    const boardId = parseId(req.params.boardId)
    const userId = parseId(req.params.userId)
    if (!boardId || !userId) return res.status(404).json({ error: '找不到成員' })
    const board = getBoardRow(db, boardId)
    if (!board) return res.status(404).json({ error: '看板不存在' })
    if (board.owner_id !== req.user.id) {
      return res.status(403).json({ error: '只有看板擁有者可以移除成員' })
    }
    if (userId === board.owner_id) {
      return res.status(400).json({ error: '無法移除看板擁有者' })
    }
    db.prepare('DELETE FROM board_members WHERE board_id = ? AND user_id = ?').run(boardId, userId)
    res.status(204).end()
  })

  return router
}
