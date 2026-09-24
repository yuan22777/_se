/**
 * 校務行政系統 - 後端 E2E 測試共用 helper
 *
 * DB 隔離策略：每個測試檔在 before() 快照 school.db，
 * after() 還原，測試可自由寫入 DB。
 * 執行時請用 `npm test`（node --test --test-concurrency=1），循序執行避免 DB 競爭。
 * 注意：執行前請先停止 dev 後端，避免同時佔用 school.db。
 */
import { copyFileSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';

const here = dirname(fileURLToPath(import.meta.url));
// tests/helpers -> server/
const SERVER_DIR = join(here, '..', '..');
// tests/helpers -> server -> 02/school.db
export const DB_PATH = join(here, '..', '..', '..', 'school.db');
const BAK_PATH = `${DB_PATH}.e2e-bak`;

function restoreDbFile() {
  copyFileSync(BAK_PATH, DB_PATH);
  rmSync(BAK_PATH, { force: true });
}

/** 執行種子腳本，將 school.db 重建成固定初始狀態。 */
function seedDb() {
  execFileSync('node', ['scripts/seed.js'], { cwd: SERVER_DIR, stdio: 'pipe' });
}

/**
 * 每個測試檔開始前都重建種子資料再快照，保證測試起點一致
 * （不受前端 E2E 或人工操作殘留影響）。
 * 若上次異常中斷留下 .bak，先還原再重建，自我修復。
 */
export function snapshotDb() {
  if (existsSync(BAK_PATH)) {
    restoreDbFile();
  }
  seedDb();
  copyFileSync(DB_PATH, BAK_PATH);
}

/** 還原 DB 並清除快照。先關閉連線，Windows 下才能安全覆寫 DB 檔。 */
export async function restoreDb() {
  const { closeDb } = await import('../../src/config/database.js');
  closeDb();
  if (existsSync(BAK_PATH)) {
    restoreDbFile();
  }
}

/** 在隨機可用 port 啟動 Express app，避開 dev server 的 3000。 */
export async function startServer(app) {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

export async function stopServer(server) {
  server.closeAllConnections?.();
  await new Promise((resolve) => server.close(resolve));
}

/** 薄封裝 fetch，回傳 { status, data }。 */
export async function api(baseUrl, method, path, token, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    // 無 body（理論上不會發生，所有 API 皆回 JSON）
  }
  return { status: res.status, data };
}

export async function loginAs(baseUrl, username, password) {
  return api(baseUrl, 'POST', '/api/auth/login', null, { username, password });
}
