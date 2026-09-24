import { test, expect } from '@playwright/test';
import { btn, login } from './helpers';

test.beforeEach(async ({ page }) => {
  await login(page, 'S002', 'pass123');
  await expect(page).toHaveURL('/student/select');
});

test('選課頁列出課程與名額', async ({ page }) => {
  await expect(page.getByText('當前學期開放選課')).toBeVisible();
  await expect(page.getByText('計算機概論').first()).toBeVisible();
  await expect(btn(page, '加選').first()).toBeVisible();
});

test('加選 → 變已選修 → 退選 → 恢復未選修', async ({ page }) => {
  // 找一列未選修的課（S002 不可能全選 10 門），用課程代碼鎖定該列：
  // 加選後該列不再含「未選修」，原 locator 會漂移到別列
  const target = page.locator('tbody tr', { hasText: '未選修' }).first();
  const code = ((await target.locator('td').first().textContent()) || '').trim();
  const rowByCode = () => page.locator('tbody tr', { hasText: code }).first();

  await btn(target, '加選').click();
  await expect(page.getByText('加選成功')).toBeVisible();
  await expect(rowByCode().getByText('已選修')).toBeVisible();

  await btn(rowByCode(), '退選').click();
  await expect(page.getByText('退選成功')).toBeVisible();
  await expect(rowByCode().getByText('未選修')).toBeVisible();
});

test('課表頁與成績頁正常渲染', async ({ page }) => {
  await page.goto('/student/schedule');
  await expect(page.getByText('當學期個人週課表').or(page.getByText('本學期尚未選修任何課程'))).toBeVisible();

  await page.goto('/student/grades');
  await expect(page.getByText('總體 GPA')).toBeVisible();
  await expect(page.getByText('歷年成績單')).toBeVisible();
});
