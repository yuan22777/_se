import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth.jsx'
import AuthPage from './pages/AuthPage.jsx'
import BoardsPage from './pages/BoardsPage.jsx'
import BoardPage from './pages/BoardPage.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        載入中…
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <BoardsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/boards/:boardId"
        element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="*" element={<Navigate to="/boards" replace />} />
    </Routes>
  )
}
