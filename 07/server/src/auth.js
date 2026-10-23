import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function publicUser(user) {
  if (!user) return null
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  }
}

export function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : ''
}

export function validateRegistration({ name, email, password }) {
  if (!name || !String(name).trim()) return '請輸入姓名'
  if (!EMAIL_PATTERN.test(normalizeEmail(email))) return '請輸入有效的電子郵件'
  if (!password || String(password).length < 6) return '密碼至少需要 6 個字元'
  return null
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

export function signToken(user, secret) {
  return jwt.sign({ sub: String(user.id), email: user.email }, secret, { expiresIn: '7d' })
}

export function createRequireAuth(db, secret) {
  return function requireAuth(req, res, next) {
    const header = req.headers.authorization || ''
    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ error: '請先登入' })
    }
    try {
      const payload = jwt.verify(header.slice(7), secret)
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(Number(payload.sub))
      if (!user) return res.status(401).json({ error: '登入狀態已失效' })
      req.user = publicUser(user)
      next()
    } catch {
      return res.status(401).json({ error: '登入狀態已失效' })
    }
  }
}
