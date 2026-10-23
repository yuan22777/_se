export function getBoardMembership(db, boardId, userId) {
  return db
    .prepare('SELECT role FROM board_members WHERE board_id = ? AND user_id = ?')
    .get(boardId, userId)
}

export function getBoardRow(db, boardId) {
  return db.prepare('SELECT * FROM boards WHERE id = ?').get(boardId)
}

export function getMemberRole(db, boardId, userId) {
  return getBoardMembership(db, boardId, userId)?.role ?? null
}

export function getBoardDetail(db, boardId) {
  const board = getBoardRow(db, boardId)
  if (!board) return null

  const lists = db
    .prepare('SELECT * FROM lists WHERE board_id = ? ORDER BY position, id')
    .all(boardId)
  const cards = db
    .prepare(
      `SELECT c.* FROM cards c
       JOIN lists l ON l.id = c.list_id
       WHERE l.board_id = ?
       ORDER BY c.position, c.id`,
    )
    .all(boardId)
  const members = db
    .prepare(
      `SELECT u.id, u.name, u.email, m.role, m.created_at AS joined_at
       FROM board_members m
       JOIN users u ON u.id = m.user_id
       WHERE m.board_id = ?
       ORDER BY CASE m.role WHEN 'owner' THEN 0 ELSE 1 END, u.name`,
    )
    .all(boardId)

  return {
    ...board,
    members,
    lists: lists.map((list) => ({
      ...list,
      cards: cards.filter((card) => card.list_id === list.id),
    })),
  }
}

export function listBoardsForUser(db, userId) {
  return db
    .prepare(
      `SELECT b.id, b.name, b.owner_id, b.created_at, m.role,
        (SELECT COUNT(*) FROM lists l WHERE l.board_id = b.id) AS list_count,
        (SELECT COUNT(*) FROM cards c JOIN lists l ON l.id = c.list_id WHERE l.board_id = b.id) AS card_count
       FROM boards b
       JOIN board_members m ON m.board_id = b.id
       WHERE m.user_id = ?
       ORDER BY b.created_at DESC, b.id DESC`,
    )
    .all(userId)
}

export function getListContext(db, listId) {
  return db
    .prepare(
      `SELECT l.*, b.owner_id
       FROM lists l
       JOIN boards b ON b.id = l.board_id
       WHERE l.id = ?`,
    )
    .get(listId)
}

export function getCardContext(db, cardId) {
  return db
    .prepare(
      `SELECT c.*, l.board_id, l.status_key, b.owner_id
       FROM cards c
       JOIN lists l ON l.id = c.list_id
       JOIN boards b ON b.id = l.board_id
       WHERE c.id = ?`,
    )
    .get(cardId)
}

export function getBoardCards(db, boardId) {
  return db
    .prepare(
      `SELECT c.* FROM cards c
       JOIN lists l ON l.id = c.list_id
       WHERE l.board_id = ?
       ORDER BY c.position, c.id`,
    )
    .all(boardId)
}

export function getListCards(db, listId) {
  return db.prepare('SELECT * FROM cards WHERE list_id = ? ORDER BY position, id').all(listId)
}

export function getCard(db, cardId) {
  return db.prepare('SELECT * FROM cards WHERE id = ?').get(cardId)
}
