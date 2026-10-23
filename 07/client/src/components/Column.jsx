import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { api } from '../api.js'
import { isOverdue, validateCardInput } from '@shared/cards'
import { useToast } from './Toast.jsx'

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
}

const PRIORITY_LABELS = {
  high: '高',
  medium: '中',
  low: '低',
}

function CardItem({ card, onOpen }) {
  const toast = useToast()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `card-${card.id}`,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  let overdue = false
  try {
    overdue = isOverdue(card.due_date)
  } catch {
    overdue = false
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      {...attributes}
      {...listeners}
      className={`touch-none rounded-xl border bg-white p-3 shadow-sm transition ${
        isDragging
          ? 'z-10 border-indigo-400 opacity-80 shadow-xl'
          : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
      } ${overdue ? 'border-l-4 border-l-red-500' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 break-words text-sm font-semibold text-slate-800">{card.title}</h3>
        <button
          type="button"
          aria-label={`編輯卡片 ${card.title}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onOpen(card)}
          className="rounded-md px-1.5 py-0.5 text-xs text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
        >
          編輯
        </button>
      </div>
      {card.description && (
        <p className="mt-1 line-clamp-2 break-words text-xs text-slate-500">{card.description}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-2 py-0.5 font-semibold ${PRIORITY_STYLES[card.priority] ?? PRIORITY_STYLES.medium}`}>
          {PRIORITY_LABELS[card.priority] ?? '中'}優先
        </span>
        {card.due_date && (
          <span className={overdue ? 'font-semibold text-red-600' : 'text-slate-500'}>
            {overdue ? '逾期 ' : '截止 '}
            {card.due_date}
          </span>
        )}
      </div>
    </article>
  )
}

function AddCardForm({ list, onChanged }) {
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const error = validateCardInput({ title, priority, due_date: dueDate || null })
    if (error) {
      toast.error(error)
      return
    }

    setSaving(true)
    try {
      await api.createCard(list.id, {
        title: title.trim(),
        priority,
        due_date: dueDate || null,
      })
      toast.success('已新增卡片')
      setTitle('')
      setPriority('medium')
      setDueDate('')
      setOpen(false)
      await onChanged()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-xl border border-dashed border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
      >
        + 新增卡片
      </button>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-2 rounded-xl border border-indigo-200 bg-indigo-50/60 p-3">
      <input
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="卡片標題"
        data-testid={`card-title-input-${list.id}`}
        className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          aria-label="優先級"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm"
        >
          <option value="high">高優先</option>
          <option value="medium">中優先</option>
          <option value="low">低優先</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          aria-label="截止日期"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {saving ? '儲存中…' : '建立'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-white"
        >
          取消
        </button>
      </div>
    </form>
  )
}

export function Column({ list, onOpenCard, onChanged }) {
  const { setNodeRef, isOver } = useDroppable({ id: `list-${list.id}` })

  return (
    <section
      ref={setNodeRef}
      data-testid={`column-${list.title}`}
      className={`flex w-72 shrink-0 flex-col rounded-2xl border p-3 transition ${
        isOver ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-slate-100/80'
      }`}
    >
      <header className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">{list.title}</h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
          {list.cards.length}
        </span>
      </header>

      <div className="flex min-h-[360px] flex-col gap-2">
        <SortableContext
          items={list.cards.map((card) => `card-${card.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {list.cards.map((card) => (
            <CardItem key={card.id} card={card} onOpen={onOpenCard} />
          ))}
        </SortableContext>
      </div>

      <AddCardForm list={list} onChanged={onChanged} />
    </section>
  )
}
