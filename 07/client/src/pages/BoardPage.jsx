import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { api } from '../api.js'
import { useAuth } from '../auth.jsx'
import { useToast } from '../components/Toast.jsx'
import { Column } from '../components/Column.jsx'
import { CardModal } from '../components/CardModal.jsx'
import { validateListName } from '@shared/cards'

function parseCardId(id) {
  return Number(String(id).replace('card-', ''))
}

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const toast = useToast()
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingCard, setEditingCard] = useState(null)
  const [listName, setListName] = useState('')
  const [addingList, setAddingList] = useState(false)
  const [email, setEmail] = useState('')
  const [inviting, setInviting] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  const load = useCallback(async () => {
    try {
      const data = await api.getBoard(boardId)
      setBoard(data.board)
    } catch (error) {
      toast.error(error.message)
      if (error.status === 403 || error.status === 404) navigate('/boards', { replace: true })
    } finally {
      setLoading(false)
    }
  }, [boardId, navigate, toast])

  useEffect(() => {
    load()
  }, [load])

  async function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeCardId = parseCardId(active.id)
    const overId = String(over.id)
    let targetList = null
    let targetIndex = 0

    if (overId.startsWith('list-')) {
      const listId = Number(overId.replace('list-', ''))
      targetList = board.lists.find((list) => list.id === listId) ?? null
      if (targetList) {
        targetIndex = targetList.cards.filter((card) => card.id !== activeCardId).length
      }
    } else if (overId.startsWith('card-')) {
      const overCardId = parseCardId(overId)
      targetList =
        board.lists.find((list) => list.cards.some((card) => card.id === overCardId)) ?? null
      if (targetList) {
        const siblings = targetList.cards.filter((card) => card.id !== activeCardId)
        const index = siblings.findIndex((card) => card.id === overCardId)
        targetIndex = index < 0 ? siblings.length : index
      }
    }

    if (!targetList) return

    try {
      await api.updateCard(activeCardId, { list_id: targetList.id, position: targetIndex })
      await load()
    } catch (error) {
      toast.error(error.message)
      await load()
    }
  }

  async function onCreateList(event) {
    event.preventDefault()
    const error = validateListName(listName)
    if (error) {
      toast.error(error)
      return
    }
    setAddingList(true)
    try {
      await api.createList(board.id, listName.trim())
      toast.success('已新增列表')
      setListName('')
      await load()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setAddingList(false)
    }
  }

  async function onInvite(event) {
    event.preventDefault()
    if (!email.trim()) {
      toast.error('請輸入成員的電子郵件')
      return
    }
    setInviting(true)
    try {
      await api.addMember(board.id, email.trim())
      toast.success('已邀請成員加入看板')
      setEmail('')
      await load()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setInviting(false)
    }
  }

  async function onRemoveMember(memberId) {
    try {
      await api.removeMember(board.id, memberId)
      toast.success('已移除成員')
      await load()
    } catch (requestError) {
      toast.error(requestError.message)
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-500">載入看板中…</div>
  }
  if (!board) return null

  const isOwner = board.role === 'owner'

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-start justify-between gap-4">
          <div>
            <Link to="/boards" className="text-sm font-medium text-indigo-600 hover:underline">
              ← 所有看板
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{board.name}</h1>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isOwner ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                }`}
              >
                {isOwner ? '擁有者' : '協作者'}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            {isOwner && (
              <form onSubmit={onInvite} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="邀請成員的 Email"
                  className="w-52 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="submit"
                  disabled={inviting}
                  className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
                >
                  邀請
                </button>
              </form>
            )}
            <div className="flex flex-wrap justify-end gap-1.5">
              {board.members.map((member) => (
                <span
                  key={member.id}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                >
                  {member.name}
                  <span className="text-slate-400">
                    {member.role === 'owner' ? '（擁有者）' : ''}
                  </span>
                  {isOwner && member.id !== user?.id && (
                    <button
                      type="button"
                      onClick={() => onRemoveMember(member.id)}
                      aria-label={`移除成員 ${member.name}`}
                      className="ml-0.5 text-slate-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto px-4 py-6 sm:px-6">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="mx-auto flex w-max items-start gap-4 pb-6">
            {board.lists.map((list) => (
              <Column
                key={list.id}
                list={list}
                onOpenCard={setEditingCard}
                onChanged={load}
              />
            ))}

            <form
              onSubmit={onCreateList}
              className="w-72 shrink-0 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-3"
            >
              <h2 className="mb-2 px-1 text-sm font-bold uppercase tracking-wide text-slate-500">
                新增列表
              </h2>
              <input
                value={listName}
                onChange={(event) => setListName(event.target.value)}
                placeholder="列表名稱"
                data-testid="new-list-input"
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="submit"
                disabled={addingList}
                className="mt-2 w-full rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {addingList ? '新增中…' : '新增列表'}
              </button>
            </form>
          </div>
        </DndContext>
      </main>

      {editingCard && (
        <CardModal
          key={editingCard.id}
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onChanged={load}
        />
      )}
    </div>
  )
}
