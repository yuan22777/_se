import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

const STYLES = {
  error: 'bg-red-600 text-white border-red-500',
  success: 'bg-emerald-600 text-white border-emerald-500',
  info: 'bg-slate-800 text-white border-slate-700',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }, [])

  const push = useCallback(
    (message, type = 'info') => {
      idRef.current += 1
      const id = idRef.current
      setToasts((current) => [...current, { id, message, type }])
      setTimeout(() => remove(id), 4000)
    },
    [remove],
  )

  const value = useMemo(
    () => ({
      toast: {
        error: (message) => push(message, 'error'),
        success: (message) => push(message, 'success'),
        info: (message) => push(message, 'info'),
      },
    }),
    [push],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((item) => (
          <div
            key={item.id}
            role="alert"
            data-testid="toast"
            data-type={item.type}
            className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${STYLES[item.type] ?? STYLES.info}`}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context.toast
}
