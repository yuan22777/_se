import { Router } from 'express'
import { nowIso } from '../db.js'
import {
  hashPassword,
  normalizeEmail,
  publicUser,
  signToken,
  validateRegistration,
  verifyPassword,
} from '../auth.js'

export function createAuthRouter({ db, jwtSecret, requireAuth }) {
  const router = Router()

  router.post('/register', (req, res) => {
    const { name, email, password } = req.body ?? {}
    const error = validateRegistration({ name, email, password })
    if (error) return res.status(400).json({ error })

    const normalized = normalizeEmail(email)
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalized)
    if (existing) return res.status(409).json({ error: '此電子郵件已被註冊' })

    const createdAt = nowIso()
    const result = db
      .prepare('INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
      .run(String(name).trim(), normalized, hashPassword(String(password)), createdAt)
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(Number(result.lastInsertRowid))

    return res.status(201).json({ token: signToken(user, jwtSecret), user: publicUser(user) })
  })

  router.post('/login', (req, res) => {
    const { email, password } = req.body ?? {}
    const user = db
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(normalizeEmail(email))

    if (!user || !verifyPassword(String(password ?? ''), user.password_hash)) {
      return res.status(401).json({ error: '電子郵件或密碼錯誤' })
    }

    return res.json({ token: signToken(user, jwtSecret), user: publicUser(user) })
  })

  router.get('/me', requireAuth, (req, res) => {
    res.json({ user: req.user })
  })

  return router
}
