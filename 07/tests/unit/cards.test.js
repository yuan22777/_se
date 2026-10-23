import { describe, expect, it } from 'vitest'
import {
  isOverdue,
  moveCard,
  sortCardsByPriority,
  validateBoardName,
  validateCardInput,
} from '../../shared/cards.js'

describe('sortCardsByPriority', () => {
  it('依高 → 中 → 低排序，並以 position 維持同優先級順序', () => {
    const cards = [
      { id: 1, title: '低', priority: 'low', position: 0 },
      { id: 2, title: '高-後', priority: 'high', position: 2 },
      { id: 3, title: '中', priority: 'medium', position: 1 },
      { id: 4, title: '高-前', priority: 'high', position: 0 },
      { id: 5, title: '低-後', priority: 'low', position: 1 },
    ]

    const sorted = sortCardsByPriority(cards)

    expect(sorted.map((card) => card.id)).toEqual([4, 2, 3, 1, 5])
    expect(sorted.map((card) => card.priority)).toEqual(['high', 'high', 'medium', 'low', 'low'])
  })

  it('不會修改原始陣列', () => {
    const cards = [
      { id: 1, priority: 'low', position: 0 },
      { id: 2, priority: 'high', position: 1 },
    ]
    const snapshot = structuredClone(cards)
    sortCardsByPriority(cards)
    expect(cards).toEqual(snapshot)
  })
})

describe('isOverdue', () => {
  const now = new Date('2026-10-23T12:00:00.000Z')

  it('昨天回傳 true', () => {
    expect(isOverdue('2026-10-22', now)).toBe(true)
  })

  it('明天回傳 false', () => {
    expect(isOverdue('2026-10-24', now)).toBe(false)
  })

  it('沒有截止日期時回傳 false', () => {
    expect(isOverdue(null, now)).toBe(false)
    expect(isOverdue('', now)).toBe(false)
  })

  it('日期格式無效時拋出異常', () => {
    expect(() => isOverdue('not-a-date', now)).toThrow(TypeError)
  })
})

describe('validateCardInput', () => {
  it('空字串標題回傳錯誤訊息', () => {
    expect(validateCardInput({ title: '' })).toBe('請輸入卡片標題')
    expect(validateCardInput({ title: '   ' })).toBe('請輸入卡片標題')
  })

  it('標題超過 100 字回傳錯誤訊息', () => {
    expect(validateCardInput({ title: 'x'.repeat(101) })).toBe('卡片標題不可超過 100 字')
    expect(validateCardInput({ title: 'x'.repeat(100) })).toBeNull()
  })

  it('合法輸入回傳 null', () => {
    expect(
      validateCardInput({ title: '完成 API 測試', priority: 'high', due_date: '2026-12-31' }),
    ).toBeNull()
  })

  it('優先級或日期格式錯誤時回傳錯誤訊息', () => {
    expect(validateCardInput({ title: '測試', priority: 'urgent' })).toBe(
      '優先級必須為 high、medium 或 low',
    )
    expect(validateCardInput({ title: '測試', due_date: '2026/12/31' })).toBe(
      '截止日期格式必須為 YYYY-MM-DD',
    )
  })
})

describe('validateBoardName', () => {
  it('空白看板名稱回傳錯誤', () => {
    expect(validateBoardName(' ')).toBe('請輸入看板名稱')
    expect(validateBoardName('產品開發')).toBeNull()
  })
})

describe('moveCard', () => {
  const cards = [
    { id: 1, list_id: 10, position: 0, priority: 'low' },
    { id: 2, list_id: 10, position: 1, priority: 'high' },
    { id: 3, list_id: 10, position: 2, priority: 'medium' },
    { id: 4, list_id: 20, position: 0, priority: 'high' },
  ]

  it('可在同一列表內重新排序', () => {
    const moved = moveCard(cards, 3, 10, 0)
    const list10 = moved.filter((card) => card.list_id === 10).sort((a, b) => a.position - b.position)
    expect(list10.map((card) => card.id)).toEqual([3, 1, 2])
    expect(list10.map((card) => card.position)).toEqual([0, 1, 2])
  })

  it('可跨列表移動並重排兩邊的 position', () => {
    const moved = moveCard(cards, 1, 20, 1)
    const list10 = moved.filter((card) => card.list_id === 10).sort((a, b) => a.position - b.position)
    const list20 = moved.filter((card) => card.list_id === 20).sort((a, b) => a.position - b.position)
    expect(list10.map((card) => card.id)).toEqual([2, 3])
    expect(list20.map((card) => card.id)).toEqual([4, 1])
    expect(list20.map((card) => card.position)).toEqual([0, 1])
  })

  it('超出的索引會被夾在合法範圍內', () => {
    const moved = moveCard(cards, 4, 10, 999)
    const list10 = moved.filter((card) => card.list_id === 10).sort((a, b) => a.position - b.position)
    expect(list10.map((card) => card.id)).toEqual([1, 2, 3, 4])
  })

  it('找不到卡片時拋出異常', () => {
    expect(() => moveCard(cards, 999, 10, 0)).toThrow('Card not found')
  })
})
