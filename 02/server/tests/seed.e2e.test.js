/**
 * E2E：種子資料驗證（對應 plan.md 種子資料表）
 * users 8 筆 / semesters 3 筆 / courses 10 筆 / offerings 10 筆，
 * 114-1 為當前學期，所有測試帳號可登入。
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { snapshotDb, restoreDb, startServer, stopServer, api, loginAs } from './helpers/e2e.js';

describe('種子資料驗證 (E2E)', () => {
  let baseUrl;
  let server;
  let adminToken;

  before(async () => {
    snapshotDb();
    ({ server, baseUrl } = await startServer(app));
    adminToken = (await loginAs(baseUrl, 'admin', 'admin123')).data.token;
  });

  after(async () => {
    await stopServer(server);
    await restoreDb();
  });

  it('使用者 8 筆：1 管理員 + 2 教師 + 5 學生', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/admin/users', adminToken);
    assert.equal(status, 200);
    assert.equal(data.length, 8);
    const count = (role) => data.filter((u) => u.role === role).length;
    assert.equal(count('ADMIN'), 1);
    assert.equal(count('TEACHER'), 2);
    assert.equal(count('STUDENT'), 5);
  });

  it('role 篩選：?role=STUDENT 回 5 筆', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/admin/users?role=STUDENT', adminToken);
    assert.equal(status, 200);
    assert.equal(data.length, 5);
    assert.ok(data.every((u) => u.role === 'STUDENT'));
  });

  it('學期 3 筆，114-1 為當前開放學期', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/admin/semesters', adminToken);
    assert.equal(status, 200);
    assert.equal(data.length, 3);
    const active = data.filter((s) => s.is_active);
    assert.equal(active.length, 1);
    assert.equal(active[0].academic_year, 114);
    assert.equal(active[0].term, 1);
  });

  it('課程主表 10 筆、開課 10 筆', async () => {
    const courses = await api(baseUrl, 'GET', '/api/admin/courses', adminToken);
    assert.equal(courses.status, 200);
    assert.equal(courses.data.length, 10);

    const offerings = await api(baseUrl, 'GET', '/api/admin/offerings', adminToken);
    assert.equal(offerings.status, 200);
    assert.equal(offerings.data.length, 10);
    assert.ok(offerings.data.every((o) => o.is_active), '種子開課皆屬當前學期');
  });

  it('全部測試帳號皆可登入', async () => {
    const accounts = [
      ['admin', 'admin123'],
      ['T001', 'pass123'],
      ['T002', 'pass123'],
      ['S001', 'pass123'],
      ['S002', 'pass123'],
      ['S003', 'pass123'],
      ['S004', 'pass123'],
      ['S005', 'pass123'],
    ];
    for (const [username, password] of accounts) {
      const { status, data } = await loginAs(baseUrl, username, password);
      assert.equal(status, 200, `${username} 應可登入`);
      assert.ok(data.token);
    }
  });
});
