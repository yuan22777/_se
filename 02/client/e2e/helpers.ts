import { Page, Locator } from '@playwright/test';

// antd 會在按鈕中文之間自動插入空格（「登入」渲染成「登 入」），
// 所有按鈕一律用此 helper 做寬鬆比對。
export function btn(scope: Page | Locator, text: string): Locator {
  const pattern = [...text]
    .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('\\s*');
  return scope.getByRole('button', { name: new RegExp(pattern) });
}

// 經由 UI 登入，等待跳轉離開 /login（避免後續 goto 蓋掉登入請求）。
export async function login(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.getByPlaceholder('帳號').fill(username);
  await page.getByPlaceholder('密碼').fill(password);
  await Promise.all([
    page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 15_000 }),
    btn(page, '登入').click(),
  ]);
}

// 右上使用者選單登出。
export async function logout(page: Page) {
  await page.locator('header').getByRole('button', { name: /管理員|教師|學生/ }).click();
  await page.getByRole('menuitem', { name: '登出' }).click();
}
