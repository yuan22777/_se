import { test, expect } from '@playwright/test';
import { btn, login } from './helpers';

test.beforeEach(async ({ page }) => {
  await login(page, 'T001', 'pass123');
  await expect(page).toHaveURL('/teacher/courses');
});

test('授課清單顯示 5 門課', async ({ page }) => {
  await expect(page.getByText('我的授課課程')).toBeVisible();
  await expect(page.getByText('計算機概論').first()).toBeVisible();
  // T001 授課 5 筆：每列都有「當前學期」標籤
  await expect(page.getByText('當前學期')).toHaveCount(5);
});

test('成績登錄：選課 → 名冊出現 → 登分 → 送出成功', async ({ page }) => {
  await page.goto('/teacher/grades');
  await expect(page.getByRole('main').getByText('成績登錄')).toBeVisible();

  await page.getByRole('combobox').click();
  await page.locator('.ant-select-item-option').first().click();
  await expect(page.getByText('學號').first()).toBeVisible();

  const firstInput = page.locator('tbody tr').first().locator('input');
  await firstInput.fill('88');

  await btn(page, '一鍵送出').click();
  await btn(page, '確定').click();
  await expect(page.getByText('成績已送出')).toBeVisible();
});
