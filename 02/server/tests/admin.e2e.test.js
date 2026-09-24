/**
 * E2E：管理員 API
 * 涵蓋：使用者 CRUD、CSV 批次匯入、學期新增/啟用、開課 CRUD、課程主表。
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { snapshotDb, restoreDb, startServer, stopServer, api, loginAs } from './helpers/e2e.js';

describe('管理員 API (E2E)', () => {
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

  it('新增使用者成功並出現在清單', async () => {
    const r = await api(baseUrl, 'POST', '/api/admin/users', adminToken, {
      username: 'e2e_stu',
      email: 'e2e_stu@school.edu.tw',
      password: 'pass123',
      fullName: 'E2E 學生',
      role: 'STUDENT',
    });
    assert.equal(r.status, 200);
    assert.ok(r.data.id);

    const list = await api(baseUrl, 'GET', '/api/admin/users', adminToken);
    assert.ok(list.data.some((u) => u.username === 'e2e_stu'));

    // 新帳號可登入
    const login = await loginAs(baseUrl, 'e2e_stu', 'pass123');
    assert.equal(login.status, 200);
  });

  it('重複帳號或 Email 回 400', async () => {
    const dupName = await api(baseUrl, 'POST', '/api/admin/users', adminToken, {
      username: 'e2e_stu',
      email: 'other@school.edu.tw',
      password: 'pass123',
      fullName: '重複',
      role: 'STUDENT',
    });
    assert.equal(dupName.status, 400);

    const dupEmail = await api(baseUrl, 'POST', '/api/admin/users', adminToken, {
      username: 'e2e_other',
      email: 'e2e_stu@school.edu.tw',
      password: 'pass123',
      fullName: '重複',
      role: 'STUDENT',
    });
    assert.equal(dupEmail.status, 400);
  });

  it('批次匯入：成功筆數與錯誤明細', async () => {
    const r = await api(baseUrl, 'POST', '/api/admin/users/batch-import', adminToken, {
      rows: [
        { username: 'e2e_b1', email: 'e2e_b1@school.edu.tw', password: 'pass123', fullName: '批次一', role: 'STUDENT' },
        { username: 'e2e_b2', email: 'e2e_b2@school.edu.tw', password: 'pass123', fullName: '批次二', role: 'STUDENT' },
        { username: 'e2e_stu', email: 'dup@school.edu.tw', password: 'pass123', fullName: '重複', role: 'STUDENT' },
      ],
    });
    assert.equal(r.status, 200);
    assert.equal(r.data.success, 2);
    assert.equal(r.data.errors.length, 1);
    assert.equal(r.data.errors[0].username, 'e2e_stu');
  });

  it('刪除無引用使用者成功；有選課/開課紀錄者不可刪', async () => {
    const list = await api(baseUrl, 'GET', '/api/admin/users', adminToken);
    const e2e = list.data.find((u) => u.username === 'e2e_b1');
    const del = await api(baseUrl, 'DELETE', `/api/admin/users/${e2e.id}`, adminToken);
    assert.equal(del.status, 200);

    // 種子學生 S001 有選課紀錄
    const s001 = list.data.find((u) => u.username === 'S001');
    const delStu = await api(baseUrl, 'DELETE', `/api/admin/users/${s001.id}`, adminToken);
    assert.equal(delStu.status, 400);

    // 種子教師 T001 有開課紀錄
    const t001 = list.data.find((u) => u.username === 'T001');
    const delTea = await api(baseUrl, 'DELETE', `/api/admin/users/${t001.id}`, adminToken);
    assert.equal(delTea.status, 400);

    // 不存在的 id
    const delNone = await api(baseUrl, 'DELETE', '/api/admin/users/99999', adminToken);
    assert.equal(delNone.status, 404);
  });

  it('新增學期；重複學期回 400', async () => {
    const r = await api(baseUrl, 'POST', '/api/admin/semesters', adminToken, {
      academicYear: 115,
      term: 1,
    });
    assert.equal(r.status, 200);
    assert.ok(r.data.id);

    const dup = await api(baseUrl, 'POST', '/api/admin/semesters', adminToken, {
      academicYear: 114,
      term: 1,
    });
    assert.equal(dup.status, 400);
  });

  it('切換當前學期：舊學期自動關閉，且可切回', async () => {
    const before = await api(baseUrl, 'GET', '/api/admin/semesters', adminToken);
    const sem115 = before.data.find((s) => s.academic_year === 115);
    const sem114 = before.data.find((s) => s.academic_year === 114 && s.term === 1);

    const act = await api(baseUrl, 'PATCH', `/api/admin/semesters/${sem115.id}/activate`, adminToken);
    assert.equal(act.status, 200);

    let after = await api(baseUrl, 'GET', '/api/admin/semesters', adminToken);
    assert.equal(after.data.filter((s) => s.is_active).length, 1);
    assert.ok(after.data.find((s) => s.id === sem115.id).is_active);

    // 切回 114-1，還原測試環境
    await api(baseUrl, 'PATCH', `/api/admin/semesters/${sem114.id}/activate`, adminToken);
    after = await api(baseUrl, 'GET', '/api/admin/semesters', adminToken);
    assert.ok(after.data.find((s) => s.id === sem114.id).is_active);

    const notFound = await api(baseUrl, 'PATCH', '/api/admin/semesters/99999/activate', adminToken);
    assert.equal(notFound.status, 404);
  });

  it('新增開課成功後可刪除；有選課紀錄者不可刪', async () => {
    // 非教師擔任授課教師 → 400
    const bad = await api(baseUrl, 'POST', '/api/admin/offerings', adminToken, {
      semesterId: 1,
      courseId: 1,
      teacherId: 4, // S001 是學生
      capacity: 30,
      dayOfWeek: 6,
      startTime: '09:00',
      endTime: '10:30',
      classroom: 'E2E 教室',
    });
    assert.equal(bad.status, 400);

    const created = await api(baseUrl, 'POST', '/api/admin/offerings', adminToken, {
      semesterId: 1,
      courseId: 1,
      teacherId: 2, // T001
      capacity: 30,
      dayOfWeek: 6,
      startTime: '09:00',
      endTime: '10:30',
      classroom: 'E2E 教室',
    });
    assert.equal(created.status, 200);
    assert.ok(created.data.id);

    const del = await api(baseUrl, 'DELETE', `/api/admin/offerings/${created.data.id}`, adminToken);
    assert.equal(del.status, 200);

    // 種子開課 1 已有學生選課 → 不可刪
    const delUsed = await api(baseUrl, 'DELETE', '/api/admin/offerings/1', adminToken);
    assert.equal(delUsed.status, 400);

    const delNone = await api(baseUrl, 'DELETE', '/api/admin/offerings/99999', adminToken);
    assert.equal(delNone.status, 404);
  });

  it('課程主表：新增成功；重複代碼回 400', async () => {
    const r = await api(baseUrl, 'POST', '/api/admin/courses', adminToken, {
      courseCode: 'E2E101',
      title: 'E2E 測試課程',
      credits: 2,
      description: 'e2e',
    });
    assert.equal(r.status, 200);

    const dup = await api(baseUrl, 'POST', '/api/admin/courses', adminToken, {
      courseCode: 'CS101',
      title: '重複',
      credits: 3,
      description: '',
    });
    assert.equal(dup.status, 400);
  });
});
