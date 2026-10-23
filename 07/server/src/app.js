import express from 'express'
import cors from 'cors'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequireAuth } from './auth.js'
import { createAuthRouter } from './routes/auth.js'
import { createBoardsRouter } from './routes/boards.js'
import { createListsRouter } from './routes/lists.js'
import { createCardsRouter } from './routes/cards.js'

const currentDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(currentDir, '..', '..')

export function createApp({
  db,
  jwtSecret = process.env.JWT_SECRET || 'dev-only-secret',
  staticDir = join(projectRoot, 'client', 'dist'),
} = {}) {
  if (!db) throw new Error('createApp requires a database')

  const app = express()
  app.disable('x-powered-by')
  app.use(cors())
  app.use(express.json({ limit: '1mb' }))

  const requireAuth = createRequireAuth(db, jwtSecret)

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
  })
  app.use('/api/auth', createAuthRouter({ db, jwtSecret, requireAuth }))
  app.use('/api/boards', createBoardsRouter({ db, requireAuth }))
  app.use('/api/lists', createListsRouter({ db, requireAuth }))
  app.use('/api/cards', createCardsRouter({ db, requireAuth }))

  app.use('/api', (req, res) => {
    res.status(404).json({ error: '找不到 API 路徑' })
  })

  const indexHtml = join(staticDir, 'index.html')
  if (existsSync(indexHtml)) {
    app.use(express.static(staticDir))
    app.use((req, res, next) => {
      if (req.method !== 'GET') return next()
      res.sendFile(indexHtml)
    })
  }

  app.use((err, req, res, next) => {
    if (err?.type === 'entity.parse.failed') {
      return res.status(400).json({ error: '請求內容不是有效的 JSON' })
    }
    console.error(err)
    res.status(500).json({ error: '伺服器發生錯誤' })
  })

  return app
}
