import { Router } from 'express'
import { nowIso, withTransaction } from '../db.js'
import { validateCardInput, validateListName } from '../../../shared/cards.js'
import {
  getListCards,
  getListContext,
  getMemberRole,
} from '../repos.js'

function parseId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export function createListsRouter({ db, requireAuth }) {
  const router = Router()
  router.use(requireAuth)

  router.post('/:listId/cards', (req, res) => {
    const listId = parseId(req.params.listId)
    if (!listId) return res.status(404).json({ error: '列表不存在' })
    const list = getListContext(db, listId)
    if (!list) return res.status(404).json({ error: '列表不存在' })
    if (!getMemberRole(db, list.board_id, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限新增卡片' })
    }

    const { title, description = '', priority = 'medium', due_date = null } = req.body ?? {}
    const error = validateCardInput({ title, priority, due_date })
    if (error) return res.status(400).json({ error })

    const createdAt = nowIso()
    const max = db
      .prepare('SELECT COALESCE(MAX(position), -1) AS max FROM cards WHERE list_id = ?')
      .get(listId).max
    const result = db
      .prepare(
        `INSERT INTO cards (list_id, title, description, priority, due_date, status, position, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        listId,
        String(title).trim(),
        String(description ?? ''),
        priority,
        due_date === '' ? null : due_date,
        list.status_key ?? 'todo',
        Number(max) + 1,
        createdAt,
        createdAt,
      )
    const card = db.prepare('SELECT * FROM cards WHERE id = ?').get(Number(result.lastInsertRowid))
    res.status(201).json({ card })
  })

  router.patch('/:listId', (req, res) => {
    const listId = parseId(req.params.listId)
    if (!listId) return res.status(404).json({ error: '列表不存在' })
    const list = getListContext(db, listId)
    if (!list) return res.status(404).json({ error: '列表不存在' })
    if (!getMemberRole(db, list.board_id, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限修改列表' })
    }

    const error = validateListName(req.body?.title)
    if (error) return res.status(400).json({ error })

    db.prepare('UPDATE lists SET title = ? WHERE id = ?').run(String(req.body.title).trim(), listId)
    const updated = db.prepare('SELECT * FROM lists WHERE id = ?').get(listId)
    res.json({ list: updated })
  })

  router.delete('/:listId', (req, res) => {
    const listId = parseId(req.params.listId)
    if (!listId) return res.status(404).json({ error: '列表不存在' })
    const list = getListContext(db, listId)
    if (!list) return res.status(404).json({ error: '列表不存在' })
    if (!getMemberRole(db, list.board_id, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限刪除列表' })
    }

    withTransaction(db, () => {
      db.prepare('DELETE FROM lists WHERE id = ?').run(listId)
      const remaining = db
        .prepare('SELECT id FROM lists WHERE board_id = ? ORDER BY position, id')
        .all(list.board_id)
      const update = db.prepare('UPDATE lists SET position = ? WHERE id = ?')
      remaining.forEach((item, index) => update.run(index, item.id))
    })

    res.status(204).end()
  })

  router.get('/:listId/cards', (req, res) => {
    const listId = parseId(req.params.listId)
    if (!listId) return res.status(404).json({ error: '列表不存在' })
    const list = getListContext(db, listId)
    if (!list) return res.status(404).json({ error: '列表不存在' })
    if (!getMemberRole(db, list.board_id, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限查看列表' })
    }
    res.json({ cards: getListCards(db, listId) })
  })

  return router
}
