import request from 'supertest'
import { createApp } from '../../server/src/app.js'
import { createDatabase } from '../../server/src/db.js'

let counter = 0

export function createTestContext() {
  const db = createDatabase(':memory:')
  const jwtSecret = 'test-secret'
  const app = createApp({ db, jwtSecret, staticDir: '__no_static__' })
  const api = request(app)

  async function register(overrides = {}) {
    counter += 1
    const payload = {
      name: `使用者 ${counter}`,
      email: `user${counter}-${Date.now()}@example.com`,
      password: 'password123',
      ...overrides,
    }
    const response = await api.post('/api/auth/register').send(payload)
    return {
      response,
      token: response.body.token,
      user: response.body.user,
      payload,
    }
  }

  function createBoard(token, name) {
    return api
      .post('/api/boards')
      .set('Authorization', `Bearer ${token}`)
      .send({ name })
  }

  function createCard(token, listId, payload) {
    return api
      .post(`/api/lists/${listId}/cards`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
  }

  return { db, app, api, jwtSecret, register, createBoard, createCard }
}
