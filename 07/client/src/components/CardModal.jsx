import { useState } from 'react'
import { api } from '../api.js'
import { validateCardInput } from '@shared/cards'
import { Modal } from './Modal.jsx'
import { useToast } from './Toast.jsx'

export function CardModal({ card, onClose, onChanged }) {
  const toast = useToast()
  const [form, setForm] = useState({
    title: card.title,
    description: card.description ?? '',
    priority: card.priority,
    due_date: card.due_date ?? '',
  })
  const [saving, setSaving] = useState(false)

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const error = validateCardInput({ ...form, due_date: form.due_date || null })
    if (error) {
      toast.error(error)
      return
    }

    setSaving(true)
    try {
      await api.updateCard(card.id, {
        title: form.title.trim(),
        description: form.description,
        priority: form.priority,
        due_date: form.due_date || null,
      })
      toast.success('卡片已更新')
      await onChanged()
      onClose()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    if (!window.confirm('確定要刪除這張卡片嗎？')) return
    setSaving(true)
    try {
      await api.deleteCard(card.id)
      toast.success('卡片已刪除')
      await onChanged()
      onClose()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title="編輯卡片" onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          標題
          <input
            value={form.title}
            onChange={update('title')}
            data-testid="edit-card-title"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          描述
          <textarea
            value={form.description}
            onChange={update('description')}
            rows={3}
            className="mt-1 w-full resize-y rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            優先級
            <select
              value={form.priority}
              onChange={update('priority')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            截止日期
            <input
              type="date"
              value={form.due_date}
              onChange={update('due_date')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5"
            />
          </label>
        </div>
        <p className="text-xs text-slate-400">
          目前狀態：{card.status} · 更新於 {new Date(card.updated_at).toLocaleString()}
        </p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            刪除卡片
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
            >
              {saving ? '儲存中…' : '儲存'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
