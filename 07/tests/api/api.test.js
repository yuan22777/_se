import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createTestContext } from './helpers.js'

let ctx

beforeEach(() => {
  ctx = createTestContext()
})

afterEach(() => {
  ctx.db.close()
})

describe('看板 API 與資料庫整合', () => {
  it('POST /api/boards 附帶 JWT 會回傳 201，且資料庫確實新增看板與預設列表', async () => {
    const { token, user } = await ctx.register({ name: 'Alice' })

    const response = await ctx.createBoard(token, '產品開發')

    expect(response.status).toBe(201)
    expect(response.body.board.name).toBe('產品開發')
    expect(response.body.board.role).toBe('owner')
    expect(response.body.board.lists.map((list) => list.title)).toEqual([
      'To Do',
      'In Progress',
      'Done',
    ])

    const boardRow = ctx.db
      .prepare('SELECT * FROM boards WHERE id = ?')
      .get(response.body.board.id)
    expect(boardRow).toBeTruthy()
    expect(boardRow.name).toBe('產品開發')
    expect(boardRow.owner_id).toBe(user.id)

    const memberRow = ctx.db
      .prepare('SELECT * FROM board_members WHERE board_id = ? AND user_id = ?')
      .get(response.body.board.id, user.id)
    expect(memberRow.role).toBe('owner')

    const listRows = ctx.db
      .prepare('SELECT * FROM lists WHERE board_id = ? ORDER BY position')
      .all(response.body.board.id)
    expect(listRows).toHaveLength(3)
  })

  it('沒有 JWT 時無法建立看板 (401)', async () => {
    const response = await ctx.api.post('/api/boards').send({ name: '未授權看板' })
    expect(response.status).toBe(401)
  })

  it('使用者 A 刪除使用者 B 的卡片會被拒絕 (403)，且資料仍存在', async () => {
    const alice = await ctx.register({ name: 'Alice' })
    const bob = await ctx.register({ name: 'Bob' })
    const board = await ctx.createBoard(bob.token, 'Bob 的看板')
    const todoList = board.body.board.lists.find((list) => list.title === 'To Do')
    const card = await ctx.createCard(bob.token, todoList.id, { title: 'Bob 的機密卡片' })

    const response = await ctx.api
      .delete(`/api/cards/${card.body.card.id}`)
      .set('Authorization', `Bearer ${alice.token}`)

    expect(response.status).toBe(403)
    const stillExists = ctx.db
      .prepare('SELECT * FROM cards WHERE id = ?')
      .get(card.body.card.id)
    expect(stillExists).toBeTruthy()
    expect(stillExists.title).toBe('Bob 的機密卡片')
  })

  it('PATCH 將卡片從 To Do 移到 Done 會更新 status 與 updated_at', async () => {
    const { token } = await ctx.register()
    const board = await ctx.createBoard(token, '狀態流轉看板')
    const todoList = board.body.board.lists.find((list) => list.title === 'To Do')
    const doneList = board.body.board.lists.find((list) => list.title === 'Done')
    const card = await ctx.createCard(token, todoList.id, {
      title: '完成狀態流轉',
      priority: 'high',
    })

    expect(card.body.card.status).toBe('todo')
    const previousUpdatedAt = card.body.card.updated_at
    await new Promise((resolve) => setTimeout(resolve, 15))

    const response = await ctx.api
      .patch(`/api/cards/${card.body.card.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ list_id: doneList.id })

    expect(response.status).toBe(200)
    expect(response.body.card.list_id).toBe(doneList.id)
    expect(response.body.card.status).toBe('done')
    expect(new Date(response.body.card.updated_at).getTime()).toBeGreaterThan(
      new Date(previousUpdatedAt).getTime(),
    )

    const row = ctx.db.prepare('SELECT * FROM cards WHERE id = ?').get(card.body.card.id)
    expect(row.status).toBe('done')
    expect(row.list_id).toBe(doneList.id)
    expect(row.updated_at).toBe(response.body.card.updated_at)
  })
})

describe('成員權限與協作', () => {
  it('受邀的協作者可以新增卡片，但不能邀請其他成員', async () => {
    const owner = await ctx.register({ name: 'Owner' })
    const collaborator = await ctx.register({ name: 'Collaborator' })
    const outsider = await ctx.register({ name: 'Outsider' })

    const board = await ctx.createBoard(owner.token, '協作看板')
    const invite = await ctx.api
      .post(`/api/boards/${board.body.board.id}/members`)
      .set('Authorization', `Bearer ${owner.token}`)
      .send({ email: collaborator.user.email })
    expect(invite.status).toBe(201)

    const collaboratorBoard = await ctx.api
      .get(`/api/boards/${board.body.board.id}`)
      .set('Authorization', `Bearer ${collaborator.token}`)
    expect(collaboratorBoard.status).toBe(200)
    expect(collaboratorBoard.body.board.role).toBe('collaborator')

    const todoList = collaboratorBoard.body.board.lists.find((list) => list.title === 'To Do')
    const created = await ctx.createCard(collaborator.token, todoList.id, {
      title: '協作者新增的卡片',
    })
    expect(created.status).toBe(201)

    const forbiddenInvite = await ctx.api
      .post(`/api/boards/${board.body.board.id}/members`)
      .set('Authorization', `Bearer ${collaborator.token}`)
      .send({ email: outsider.user.email })
    expect(forbiddenInvite.status).toBe(403)

    const outsiderBoard = await ctx.api
      .get(`/api/boards/${board.body.board.id}`)
      .set('Authorization', `Bearer ${outsider.token}`)
    expect(outsiderBoard.status).toBe(403)
  })
})
