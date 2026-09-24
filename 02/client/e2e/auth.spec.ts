import { test, expect } from '@playwright/test';
import { btn, login, logout } from './helpers';

test('登入頁渲染與測試帳號提示', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByText('校務行政系統')).toBeVisible();
  await expect(page.getByPlaceholder('帳號')).toBeVisible();
  await expect(page.getByPlaceholder('密碼')).toBeVisible();
  await expect(page.getByText(/admin\/admin123/)).toBeVisible();
});

test('錯誤密碼顯示錯誤訊息且不跳轉', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('帳號').fill('admin');
  await page.getByPlaceholder('密碼').fill('wrong-password');
  await btn(page, '登入').click();
  await expect(page.getByText('帳號或密碼錯誤')).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});

test('管理員登入進儀表板並看到統計', async ({ page }) => {
  await login(page, 'admin', 'admin123');
  await expect(page).toHaveURL('/admin/dashboard');
  await expect(page.getByText('學生人數')).toBeVisible();
  await expect(page.getByText('當前學期開課概況')).toBeVisible();
});

test('學生登入進選課頁；教師登入進授課頁', async ({ page }) => {
  await login(page, 'S001', 'pass123');
  await expect(page).toHaveURL('/student/select');
  await expect(page.getByText('當前學期開放選課')).toBeVisible();

  await logout(page);
  await expect(page).toHaveURL(/\/login/);

  await login(page, 'T001', 'pass123');
  await expect(page).toHaveURL('/teacher/courses');
  await expect(page.getByText('我的授課課程')).toBeVisible();
});

test('未登入訪問後台被導回登入頁', async ({ page }) => {
  await page.goto('/admin/users');
  await expect(page).toHaveURL(/\/login/);
});

test('學生訪問管理員頁面被導回自己首頁', async ({ page }) => {
  await login(page, 'S001', 'pass123');
  await page.goto('/admin/users');
  await expect(page).toHaveURL('/student/select');
});

test('登出後回到登入頁', async ({ page }) => {
  await login(page, 'admin', 'admin123');
  await expect(page).toHaveURL('/admin/dashboard');
  await logout(page);
  await expect(page).toHaveURL(/\/login/);
});
