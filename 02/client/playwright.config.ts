import { defineConfig, devices } from '@playwright/test';

// E2E 使用獨立 port（3100/5174），避免與 dev server（3000/5173）衝突。
// 執行前不需手動啟動前後端，webServer 會自動拉起；跑完自動關閉。
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  // 單 worker 循序跑：學期切換是全域狀態，平行跑會互相干擾
  workers: 1,
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  globalSetup: './e2e/global-setup.ts',
  webServer: [
    {
      command: 'node src/index.js',
      cwd: '../server',
      port: 3100,
      env: { PORT: '3100' },
      reuseExistingServer: false,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'npx vite --port 5174 --strictPort',
      port: 5174,
      env: { BACKEND_PORT: '3100', VITE_API_URL: 'http://localhost:3100/api' },
      reuseExistingServer: false,
    },
  ],
});
