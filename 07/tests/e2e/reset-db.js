import { rm } from 'node:fs/promises'

const files = ['data/e2e.db', 'data/e2e.db-journal', 'data/e2e.db-wal', 'data/e2e.db-shm']

for (const file of files) {
  await rm(file, { force: true })
}

console.log('E2E database reset.')
