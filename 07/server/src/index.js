import { createApp } from './app.js'
import { createDatabase } from './db.js'

const port = Number(process.env.PORT || 3001)
const dbPath = process.env.DB_PATH || 'data/app.db'
const db = createDatabase(dbPath)
const app = createApp({ db })

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Kanban server listening on http://127.0.0.1:${port} (db: ${dbPath})`)
})

function shutdown() {
  server.close(() => {
    db.close()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
