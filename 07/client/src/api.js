const TOKEN_KEY = 'kanban_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`/api${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  let data = null
  if (response.status !== 204) {
    data = await response.json().catch(() => null)
  }

  if (!response.ok) {
    const error = new Error(data?.error || `請求失敗（${response.status}）`)
    error.status = response.status
    throw error
  }
  return data
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: () => request('/auth/me'),

  listBoards: () => request('/boards'),
  createBoard: (name) => request('/boards', { method: 'POST', body: { name } }),
  getBoard: (id) => request(`/boards/${id}`),
  updateBoard: (id, name) => request(`/boards/${id}`, { method: 'PATCH', body: { name } }),
  deleteBoard: (id) => request(`/boards/${id}`, { method: 'DELETE' }),
  createList: (boardId, title) =>
    request(`/boards/${boardId}/lists`, { method: 'POST', body: { title } }),
  addMember: (boardId, email) =>
    request(`/boards/${boardId}/members`, { method: 'POST', body: { email } }),
  removeMember: (boardId, userId) =>
    request(`/boards/${boardId}/members/${userId}`, { method: 'DELETE' }),

  createCard: (listId, payload) =>
    request(`/lists/${listId}/cards`, { method: 'POST', body: payload }),
  updateCard: (cardId, payload) =>
    request(`/cards/${cardId}`, { method: 'PATCH', body: payload }),
  deleteCard: (cardId) => request(`/cards/${cardId}`, { method: 'DELETE' }),
}
