import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import { useAuth } from '../auth.jsx'
import { useToast } from '../components/Toast.jsx'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/boards" replace />

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password }
      const data = isRegister ? await api.register(payload) : await api.login(payload)
      login(data.token, data.user)
      toast.success(isRegister ? '註冊成功，歡迎使用！' : '登入成功')
      navigate('/boards', { replace: true })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-10 text-white md:flex">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100">
              Collaborative Kanban
            </p>
            <h1 className="text-4xl font-black leading-tight">
              多人協作
              <br />
              待辦與專案看板
            </h1>
            <p className="mt-5 max-w-xs text-sm leading-6 text-indigo-100">
              建立看板、邀請成員、拖曳卡片，讓團隊的每一個任務都清楚可見。
            </p>
          </div>
          <ul className="space-y-2 text-sm text-indigo-100">
            <li>✓ JWT 身分驗證與成員權限</li>
            <li>✓ 卡片優先級、截止日期與逾期提示</li>
            <li>✓ 拖曳變更狀態並即時保存</li>
          </ul>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">
            {isRegister ? '建立帳號' : '歡迎回來'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isRegister ? '註冊後即可建立第一個看板' : '登入以繼續你的專案'}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {isRegister && (
              <label className="block text-sm font-medium text-slate-700">
                姓名
                <input
                  value={form.name}
                  onChange={update('name')}
                  autoComplete="name"
                  data-testid="register-name"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="王小明"
                />
              </label>
            )}
            <label className="block text-sm font-medium text-slate-700">
              電子郵件
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                autoComplete="email"
                data-testid={isRegister ? 'register-email' : 'login-email'}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              密碼
              <input
                type="password"
                value={form.password}
                onChange={update('password')}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                data-testid={isRegister ? 'register-password' : 'login-password'}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="至少 6 個字元"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              data-testid={isRegister ? 'register-submit' : 'login-submit'}
              className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? '處理中…' : isRegister ? '註冊' : '登入'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {isRegister ? '已經有帳號？' : '還沒有帳號？'}
            <Link
              to={isRegister ? '/login' : '/register'}
              className="ml-1 font-semibold text-indigo-600 hover:underline"
            >
              {isRegister ? '前往登入' : '立即註冊'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
