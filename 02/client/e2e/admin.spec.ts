import { test, expect } from '@playwright/test';
import { btn, login } from './helpers';

test.beforeEach(async ({ page }) => {
  await login(page, 'admin', 'admin123');
  await expect(page).toHaveURL('/admin/dashboard');
});

test('儀表板統計：5 學生 / 2 教師 / 10 開課', async ({ page }) => {
  await expect(
    page.locator('.ant-statistic', { hasText: '學生人數' }).getByText('5', { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('.ant-statistic', { hasText: '教師人數' }).getByText('2', { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('.ant-statistic', { hasText: '當前學期開課數' }).getByText('10', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('計算機概論').first()).toBeVisible();
});

test('使用者管理：新增 → 出現 → 刪除', async ({ page }) => {
  await page.goto('/admin/users');
  await expect(page.getByText('T001').first()).toBeVisible();

  await btn(page, '新增使用者').click();
  await page.getByLabel('帳號').fill('e2e_ui_stu');
  await page.getByLabel('姓名').fill('E2E UI 學生');
  await page.getByLabel('Email').fill('e2e_ui_stu@school.edu.tw');
  await page.getByLabel('密碼').fill('pass123');
  await btn(page, '確定').click();
  await expect(page.getByText('建立成功')).toBeVisible();
  await expect(page.getByText('e2e_ui_stu').first()).toBeVisible();

  const row = page.locator('tbody tr', { hasText: 'e2e_ui_stu' });
  await btn(row, '刪除').click();
  await btn(page, '確定').click();
  await expect(page.getByText('刪除成功')).toBeVisible();
  await expect(page.getByText('e2e_ui_stu')).toHaveCount(0);
});

test('學期管理：新增學期 → 切換當前 → 切回 114-1', async ({ page }) => {
  await page.goto('/admin/semesters');
  await expect(page.getByText('當前開放學期').first()).toBeVisible();

  await btn(page, '新增學期').click();
  await page.getByLabel('學年度（例 114）').fill('115');
  await btn(page, '確定').click();
  await expect(page.getByText('新增學期成功')).toBeVisible();

  const row115 = page.locator('tbody tr', { hasText: '115-1' });
  await expect(row115).toBeVisible();
  await btn(row115, '設為當前學期').click();
  await expect(page.getByText('已切換為當前學期')).toBeVisible();

  // 還原：切回 114-1，後續測試依賴它是當前學期
  // （不重複斷言成功訊息：與上一條並存會撞名，直接驗證標籤）
  const row114 = page.locator('tbody tr', { hasText: '114-1' });
  await btn(row114, '設為當前學期').click();
  await expect(row114.getByText('當前開放學期')).toBeVisible();
});

test('開課管理頁載入開課清單', async ({ page }) => {
  await page.goto('/admin/offerings');
  await expect(btn(page, '新增開課')).toBeVisible();
  await expect(page.getByText('計算機概論').first()).toBeVisible();
});
