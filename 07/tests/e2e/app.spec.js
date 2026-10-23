import { expect, test } from '@playwright/test'

async function registerAndLogin(page, request, label = 'E2E 使用者') {
  const email = `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`
  const password = 'password123'

  const response = await request.post('/api/auth/register', {
    data: { name: label, email, password },
  })
  expect(response.status()).toBe(201)

  await page.goto('/login')
  await page.getByTestId('login-email').fill(email)
  await page.getByTestId('login-password').fill(password)
  await page.getByTestId('login-submit').click()
  await expect(page).toHaveURL(/\/boards$/)
  return { email, password }
}

async function createBoard(page, name) {
  await page.getByTestId('board-name-input').fill(name)
  await page.getByRole('button', { name: '建立看板' }).click()
  await expect(page).toHaveURL(/\/boards\/\d+$/)
  await expect(page.getByRole('heading', { name })).toBeVisible()
}

async function dragCardToColumn(page, card, column) {
  await card.scrollIntoViewIfNeeded()
  const cardBox = await card.boundingBox()
  const columnBox = await column.boundingBox()
  if (!cardBox || !columnBox) throw new Error('找不到拖曳座標')

  const startX = cardBox.x + cardBox.width / 2
  const startY = cardBox.y + cardBox.height / 2
  const endX = columnBox.x + columnBox.width / 2
  const endY = columnBox.y + columnBox.height - 40

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX + 10, startY + 10, { steps: 4 })
  await page.mouse.move(endX, endY, { steps: 30 })
  await page.mouse.up()
}

test('Happy Path：登入、建立看板、新增卡片、拖曳到 Done 並重新整理後仍保留', async ({
  page,
  request,
}) => {
  await registerAndLogin(page, request, 'Happy Path 使用者')
  await createBoard(page, 'E2E 專案看板')

  const todoColumn = page.getByTestId('column-To Do')
  const doneColumn = page.getByTestId('column-Done')

  await todoColumn.getByRole('button', { name: /新增卡片/ }).click()
  await todoColumn.getByPlaceholder('卡片標題').fill('完成 E2E 測試')
  await todoColumn.getByRole('button', { name: '建立', exact: true }).click()

  const card = todoColumn.getByText('完成 E2E 測試', { exact: true })
  await expect(card).toBeVisible()

  const patchResponse = page.waitForResponse(
    (response) =>
      response.request().method() === 'PATCH' &&
      /\/api\/cards\/\d+$/.test(new URL(response.url()).pathname),
  )
  await dragCardToColumn(page, card, doneColumn)
  expect((await patchResponse).status()).toBe(200)

  await expect(doneColumn.getByText('完成 E2E 測試', { exact: true })).toBeVisible()

  await page.reload()
  await expect(page.getByTestId('column-Done').getByText('完成 E2E 測試', { exact: true })).toBeVisible()
})

test('異常操作：卡片標題空白時顯示紅色 Toast，且不會送出無效請求', async ({
  page,
  request,
}) => {
  await registerAndLogin(page, request, '驗證測試使用者')
  await createBoard(page, 'E2E 驗證看板')

  const cardRequests = []
  page.on('request', (req) => {
    const url = new URL(req.url())
    if (req.method() === 'POST' && /^\/api\/lists\/\d+\/cards$/.test(url.pathname)) {
      cardRequests.push(url.pathname)
    }
  })

  const todoColumn = page.getByTestId('column-To Do')
  await todoColumn.getByRole('button', { name: /新增卡片/ }).click()
  await todoColumn.getByRole('button', { name: '建立', exact: true }).click()

  const toast = page.getByTestId('toast').filter({ hasText: '請輸入卡片標題' })
  await expect(toast).toBeVisible()
  await expect(toast).toHaveAttribute('data-type', 'error')
  await expect(toast).toHaveClass(/bg-red-600/)

  await page.waitForTimeout(300)
  expect(cardRequests).toHaveLength(0)
  await expect(todoColumn.getByPlaceholder('卡片標題')).toBeVisible()
})
