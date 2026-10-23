import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import { useAuth } from '../auth.jsx'
import { useToast } from '../components/Toast.jsx'
import { validateBoardName } from '@shared/cards'

export default function BoardsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    let cancelled = false
    api
      .listBoards()
      .then((data) => {
        if (!cancelled) setBoards(data.boards)
      })
      .catch((error) => {
        if (!cancelled) toast.error(error.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [toast])

  async function onCreate(event) {
    event.preventDefault()
    const error = validateBoardName(name)
    if (error) {
      toast.error(error)
      return
    }
    setCreating(true)
    try {
      const data = await api.createBoard(name.trim())
      toast.success('看板已建立')
      setName('')
      navigate(`/boards/${data.board.id}`)
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setCreating(false)
    }
  }

  function onLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">
            Kanban Workspace
          </p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">我的看板</h1>
          <p className="mt-1 text-sm text-slate-500">你好，{user?.name}！選擇看板或建立新的專案。</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
        >
          登出
        </button>
      </header>

      <form
        onSubmit={onCreate}
        className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          data-testid="board-name-input"
          placeholder="例如：產品開發看板"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          disabled={creating}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {creating ? '建立中…' : '建立看板'}
        </button>
      </form>

      {loading ? (
        <p className="mt-10 text-center text-slate-500">載入看板中…</p>
      ) : boards.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
          <p className="text-lg font-semibold text-slate-700">還沒有看板</p>
          <p className="mt-1 text-sm text-slate-500">在上方輸入名稱，建立你的第一個看板。</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/boards/${board.id}`}
              data-testid={`board-link-${board.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">
                  {board.name}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    board.role === 'owner'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  {board.role === 'owner' ? '擁有者' : '協作者'}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                {board.list_count} 個列表 · {board.card_count} 張卡片
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
