import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// 每次 E2E 前重建種子資料，保證測試從固定狀態開始。
async function globalSetup() {
  const serverDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'server');
  execFileSync('node', ['scripts/seed.js'], { cwd: serverDir, stdio: 'inherit' });
}

export default globalSetup;
