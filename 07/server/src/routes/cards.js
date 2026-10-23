import { Router } from 'express'
import { nowIso, withTransaction } from '../db.js'
import { moveCard, validateCardInput } from '../../../shared/cards.js'
import {
  getBoardCards,
  getCard,
  getCardContext,
  getListCards,
  getMemberRole,
} from '../repos.js'

function parseId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export function createCardsRouter({ db, requireAuth }) {
  const router = Router()
  router.use(requireAuth)

  router.patch('/:cardId', (req, res) => {
    const cardId = parseId(req.params.cardId)
    if (!cardId) return res.status(404).json({ error: '卡片不存在' })
    const context = getCardContext(db, cardId)
    if (!context) return res.status(404).json({ error: '卡片不存在' })
    if (!getMemberRole(db, context.board_id, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限修改此卡片' })
    }

    const body = req.body ?? {}
    let targetListId = context.list_id
    if (body.list_id !== undefined) {
      targetListId = parseId(body.list_id)
      if (!targetListId) return res.status(400).json({ error: '目標列表不存在' })
      const targetList = db.prepare('SELECT * FROM lists WHERE id = ?').get(targetListId)
      if (!targetList || targetList.board_id !== context.board_id) {
        return res.status(400).json({ error: '目標列表不屬於此看板' })
      }
    }
    const targetList = db.prepare('SELECT * FROM lists WHERE id = ?').get(targetListId)

    let requestedPosition = null
    if (body.position !== undefined) {
      requestedPosition = Number(body.position)
      if (!Number.isInteger(requestedPosition) || requestedPosition < 0) {
        return res.status(400).json({ error: '排序位置必須是非負整數' })
      }
    }

    const next = {
      title: body.title !== undefined ? body.title : context.title,
      priority: body.priority !== undefined ? body.priority : context.priority,
      due_date:
        body.due_date !== undefined ? (body.due_date === '' ? null : body.due_date) : context.due_date,
    }
    const validationError = validateCardInput(next)
    if (validationError) return res.status(400).json({ error: validationError })

    const description =
      body.description !== undefined ? String(body.description) : context.description
    const moving = body.list_id !== undefined || body.position !== undefined

    withTransaction(db, () => {
      if (moving) {
        const allCards = getBoardCards(db, context.board_id)
        const targetSiblings = allCards.filter(
          (card) => card.list_id === targetListId && card.id !== cardId,
        )
        let index
        if (requestedPosition !== null) {
          index = requestedPosition
        } else if (context.list_id === targetListId) {
          index = Math.min(context.position, targetSiblings.length)
        } else {
          index = targetSiblings.length
        }

        const rearranged = moveCard(allCards, cardId, targetListId, index)
        const updatePosition = db.prepare('UPDATE cards SET list_id = ?, position = ? WHERE id = ?')
        for (const card of rearranged) {
          const previous = allCards.find((item) => item.id === card.id)
          if (previous.list_id !== card.list_id || previous.position !== card.position) {
            updatePosition.run(card.list_id, card.position, card.id)
          }
        }
      }

      db.prepare(
        `UPDATE cards
         SET title = ?, description = ?, priority = ?, due_date = ?, status = ?, updated_at = ?
         WHERE id = ?`,
      ).run(
        String(next.title).trim(),
        description,
        next.priority,
        next.due_date ?? null,
        targetList.status_key ?? context.status,
        nowIso(),
        cardId,
      )
    })

    res.json({ card: getCard(db, cardId) })
  })

  router.delete('/:cardId', (req, res) => {
    const cardId = parseId(req.params.cardId)
    if (!cardId) return res.status(404).json({ error: '卡片不存在' })
    const context = getCardContext(db, cardId)
    if (!context) return res.status(404).json({ error: '卡片不存在' })
    if (!getMemberRole(db, context.board_id, req.user.id)) {
      return res.status(403).json({ error: '你沒有權限刪除此卡片' })
    }

    withTransaction(db, () => {
      db.prepare('DELETE FROM cards WHERE id = ?').run(cardId)
      const remaining = getListCards(db, context.list_id)
      const update = db.prepare('UPDATE cards SET position = ? WHERE id = ?')
      remaining.forEach((card, index) => update.run(index, card.id))
    })

    res.status(204).end()
  })

  return router
}
