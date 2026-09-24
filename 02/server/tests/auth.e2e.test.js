/**
 * E2E：認證流程
 * 涵蓋：健康檢查、三角色登入、登入失敗、權杖驗證、角色守衛、密碼重設。
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { snapshotDb, restoreDb, startServer, stopServer, api, loginAs } from './helpers/e2e.js';

describe('認證 API (E2E)', () => {
  let baseUrl;
  let server;

  before(async () => {
    snapshotDb();
    ({ server, baseUrl } = await startServer(app));
  });

  after(async () => {
    await stopServer(server);
    await restoreDb();
  });

  it('GET /api/health 回傳 ok', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/health');
    assert.equal(status, 200);
    assert.equal(data.status, 'ok');
  });

  it('三種角色皆可登入並取得 JWT', async () => {
    const cases = [
      ['admin', 'admin123', 'ADMIN'],
      ['T001', 'pass123', 'TEACHER'],
      ['S001', 'pass123', 'STUDENT'],
    ];
    for (const [username, password, role] of cases) {
      const { status, data } = await loginAs(baseUrl, username, password);
      assert.equal(status, 200, `${username} 應登入成功`);
      assert.ok(data.token, '應回傳 token');
      assert.equal(data.user.username, username);
      assert.equal(data.user.role, role);
    }
  });

  it('錯誤密碼回 401', async () => {
    const { status, data } = await loginAs(baseUrl, 'admin', 'wrong-password');
    assert.equal(status, 401);
    assert.match(data.message, /帳號或密碼錯誤/);
  });

  it('未知帳號回 401', async () => {
    const { status } = await loginAs(baseUrl, 'nobody', 'pass123');
    assert.equal(status, 401);
  });

  it('缺少帳號或密碼回 400', async () => {
    const { status } = await api(baseUrl, 'POST', '/api/auth/login', null, { username: 'admin' });
    assert.equal(status, 400);
  });

  it('未帶權杖打受保護 API 回 401', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/admin/users');
    assert.equal(status, 401);
    assert.match(data.message, /未提供驗證權杖/);
  });

  it('偽造權杖回 401', async () => {
    const { status } = await api(baseUrl, 'GET', '/api/admin/users', 'fake.token.here');
    assert.equal(status, 401);
  });

  it('GET /api/auth/me 回傳登入者資訊', async () => {
    const { data: login } = await loginAs(baseUrl, 'T001', 'pass123');
    const { status, data } = await api(baseUrl, 'GET', '/api/auth/me', login.token);
    assert.equal(status, 200);
    assert.equal(data.user.username, 'T001');
  });

  it('學生打管理員 API 被 403 拒絕', async () => {
    const { data: login } = await loginAs(baseUrl, 'S001', 'pass123');
    const { status, data } = await api(baseUrl, 'GET', '/api/admin/users', login.token);
    assert.equal(status, 403);
    assert.match(data.message, /權限不足/);
  });

  it('管理員打學生 API 被 403 拒絕', async () => {
    const { data: login } = await loginAs(baseUrl, 'admin', 'admin123');
    const { status } = await api(baseUrl, 'GET', '/api/student/schedule', login.token);
    assert.equal(status, 403);
  });

  it('密碼重設完整流程：驗證舊密碼、寫入新密碼', async () => {
    const { data: login } = await loginAs(baseUrl, 'S002', 'pass123');

    // 舊密碼錯誤
    let r = await api(baseUrl, 'POST', '/api/auth/reset-password', login.token, {
      oldPassword: 'wrong',
      newPassword: 'newpass123',
    });
    assert.equal(r.status, 400);

    // 新密碼太短
    r = await api(baseUrl, 'POST', '/api/auth/reset-password', login.token, {
      oldPassword: 'pass123',
      newPassword: '123',
    });
    assert.equal(r.status, 400);

    // 成功重設
    r = await api(baseUrl, 'POST', '/api/auth/reset-password', login.token, {
      oldPassword: 'pass123',
      newPassword: 'newpass123',
    });
    assert.equal(r.status, 200);

    // 舊密碼失效、新密碼生效
    assert.equal((await loginAs(baseUrl, 'S002', 'pass123')).status, 401);
    const ok = await loginAs(baseUrl, 'S002', 'newpass123');
    assert.equal(ok.status, 200);
    assert.equal(ok.data.user.username, 'S002');
  });
});
