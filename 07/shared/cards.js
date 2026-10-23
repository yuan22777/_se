export const PRIORITY_ORDER = Object.freeze({
  high: 0,
  medium: 1,
  low: 2,
})

export const PRIORITIES = Object.freeze(['high', 'medium', 'low'])

export const DEFAULT_LISTS = Object.freeze([
  { title: 'To Do', status_key: 'todo' },
  { title: 'In Progress', status_key: 'in_progress' },
  { title: 'Done', status_key: 'done' },
])

const MAX_CARD_TITLE = 100
const MAX_BOARD_NAME = 80
const MAX_LIST_NAME = 60

export function sortCardsByPriority(cards) {
  const input = Array.isArray(cards) ? cards : []
  return [...input].sort((a, b) => {
    const pa = PRIORITY_ORDER[a?.priority] ?? 99
    const pb = PRIORITY_ORDER[b?.priority] ?? 99
    if (pa !== pb) return pa - pb
    const posA = Number.isFinite(Number(a?.position)) ? Number(a.position) : 0
    const posB = Number.isFinite(Number(b?.position)) ? Number(b.position) : 0
    if (posA !== posB) return posA - posB
    return String(a?.id ?? '').localeCompare(String(b?.id ?? ''))
  })
}

export function isOverdue(dueDate, now = new Date()) {
  if (dueDate === null || dueDate === undefined || dueDate === '') return false
  const reference = now instanceof Date ? now : new Date(now)
  if (Number.isNaN(reference.getTime())) {
    throw new TypeError('Invalid reference date')
  }

  const raw = dueDate instanceof Date ? dueDate.toISOString() : String(dueDate).trim()
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(raw)
  const due = new Date(dateOnly ? `${raw}T23:59:59.999` : raw)
  if (Number.isNaN(due.getTime())) {
    throw new TypeError(`Invalid due date: ${dueDate}`)
  }
  return due.getTime() < reference.getTime()
}

export function validateCardInput(input = {}) {
  const title = typeof input.title === 'string' ? input.title.trim() : ''
  if (!title) return '請輸入卡片標題'
  if (title.length > MAX_CARD_TITLE) return `卡片標題不可超過 ${MAX_CARD_TITLE} 字`

  if (input.priority !== undefined && input.priority !== null && !PRIORITIES.includes(input.priority)) {
    return '優先級必須為 high、medium 或 low'
  }

  if (input.due_date !== undefined && input.due_date !== null && input.due_date !== '') {
    const value = String(input.due_date)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(new Date(`${value}T00:00:00`).getTime())) {
      return '截止日期格式必須為 YYYY-MM-DD'
    }
  }

  return null
}

export function validateBoardName(name) {
  const value = typeof name === 'string' ? name.trim() : ''
  if (!value) return '請輸入看板名稱'
  if (value.length > MAX_BOARD_NAME) return `看板名稱不可超過 ${MAX_BOARD_NAME} 字`
  return null
}

export function validateListName(name) {
  const value = typeof name === 'string' ? name.trim() : ''
  if (!value) return '請輸入列表名稱'
  if (value.length > MAX_LIST_NAME) return `列表名稱不可超過 ${MAX_LIST_NAME} 字`
  return null
}

export function moveCard(cards, cardId, targetListId, targetIndex) {
  const input = Array.isArray(cards) ? cards : []
  const card = input.find((item) => String(item.id) === String(cardId))
  if (!card) throw new Error('Card not found')

  const sourceListId = card.list_id
  const groups = new Map()
  for (const item of input) {
    const key = String(item.list_id)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push({ ...item })
  }

  const source = groups.get(String(sourceListId)) ?? []
  const sourceIndex = source.findIndex((item) => String(item.id) === String(cardId))
  const [moved] = source.splice(sourceIndex, 1)

  const targetKey = String(targetListId)
  if (!groups.has(targetKey)) groups.set(targetKey, [])
  const target = groups.get(targetKey)

  let index = Number.isInteger(targetIndex) ? targetIndex : target.length
  if (index < 0) index = 0
  if (index > target.length) index = target.length

  moved.list_id = targetListId
  target.splice(index, 0, moved)

  const result = []
  for (const list of groups.values()) {
    list.forEach((item, position) => {
      result.push({ ...item, position })
    })
  }
  return result
}
