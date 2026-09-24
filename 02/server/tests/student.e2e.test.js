/**
 * E2E：學生選課核心流程
 * 涵蓋：可選清單、加選/退選、防重複、衝堂檢查、防超賣、
 * 非當學期擋下、週課表、成績 GPA 計算。
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { snapshotDb, restoreDb, startServer, stopServer, api, loginAs } from './helpers/e2e.js';

describe('學生選課 API (E2E)', () => {
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

  async function createStudent(username) {
    const r = await api(baseUrl, 'POST', '/api/admin/users', adminToken, {
      username,
      email: `${username}@school.edu.tw`,
      password: 'pass123',
      fullName: `E2E ${username}`,
      role: 'STUDENT',
    });
    assert.equal(r.status, 200);
    const login = await loginAs(baseUrl, username, 'pass123');
    return { id: r.data.id, token: login.data.token };
  }

  async function createOffering(overrides = {}) {
    const r = await api(baseUrl, 'POST', '/api/admin/offerings', adminToken, {
      semesterId: 1,
      courseId: 1,
      teacherId: 2,
      capacity: 30,
      dayOfWeek: 6, // 週六：與種子時段（週一~五）天然錯開
      startTime: '09:00',
      endTime: '10:30',
      classroom: 'E2E 教室',
      ...overrides,
    });
    assert.equal(r.status, 200);
    return r.data.id;
  }

  it('可選清單含剩餘名額與已選標記', async () => {
    const { data: login } = await loginAs(baseUrl, 'S001', 'pass123');
    const { status, data } = await api(baseUrl, 'GET', '/api/student/offerings', login.token);
    assert.equal(status, 200);
    assert.equal(data.length, 10);
    for (const o of data) {
      assert.ok(Number.isInteger(o.seats_left));
      assert.equal(typeof o.alreadyEnrolled, 'boolean');
    }
    assert.ok(data.some((o) => o.alreadyEnrolled), 'S001 應已有選課');
  });

  it('加選 → 已選標記/課表出現 → 退選 → 課表消失', async () => {
    const stu = await createStudent('e2e_flow');

    let r = await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId: 1 });
    assert.equal(r.status, 200);

    const list = await api(baseUrl, 'GET', '/api/student/offerings', stu.token);
    assert.ok(list.data.find((o) => o.offering_id === 1).alreadyEnrolled);

    let schedule = await api(baseUrl, 'GET', '/api/student/schedule', stu.token);
    assert.equal(schedule.status, 200);
    assert.equal(schedule.data.length, 1);
    assert.equal(schedule.data[0].course_code, 'CS101');

    r = await api(baseUrl, 'DELETE', '/api/student/enrollments/1', stu.token);
    assert.equal(r.status, 200);

    schedule = await api(baseUrl, 'GET', '/api/student/schedule', stu.token);
    assert.equal(schedule.data.length, 0);

    // 重複退選回 400
    r = await api(baseUrl, 'DELETE', '/api/student/enrollments/1', stu.token);
    assert.equal(r.status, 400);
  });

  it('重複加選同一門課回 400', async () => {
    const stu = await createStudent('e2e_dup');
    assert.equal((await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId: 2 })).status, 200);
    const r = await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId: 2 });
    assert.equal(r.status, 400);
  });

  it('缺少 offeringId 回 400；不存在的開課回 404', async () => {
    const stu = await createStudent('e2e_bad');
    assert.equal((await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, {})).status, 400);
    assert.equal((await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId: 99999 })).status, 404);
  });

  it('非當前學期的課不可加選', async () => {
    const offeringId = await createOffering({ semesterId: 2 }); // 113-2 非開放學期
    const stu = await createStudent('e2e_sem');
    const r = await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId });
    assert.equal(r.status, 400);
  });

  it('時間衝堂被擋下', async () => {
    // 種子開課 1 為週一 09:00~10:30；新增同時段開課製造衝堂
    const clashId = await createOffering({ dayOfWeek: 1, startTime: '09:00', endTime: '10:30' });
    const stu = await createStudent('e2e_clash');
    assert.equal((await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId: 1 })).status, 200);
    const r = await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId: clashId });
    assert.equal(r.status, 400);
    assert.match(r.data.message, /衝堂/);
  });

  it('名額滿時防超賣：第二人加選回 400', async () => {
    const offeringId = await createOffering({ capacity: 1 });
    const a = await createStudent('e2e_cap_a');
    const b = await createStudent('e2e_cap_b');
    assert.equal((await api(baseUrl, 'POST', '/api/student/enrollments', a.token, { offeringId })).status, 200);
    const r = await api(baseUrl, 'POST', '/api/student/enrollments', b.token, { offeringId });
    assert.equal(r.status, 400);
    assert.match(r.data.message, /名額已滿/);
  });

  it('成績 GPA：90 分 3 學分 → GPA 4.0', async () => {
    const stu = await createStudent('e2e_gpa');
    const offeringId = await createOffering(); // CS101，3 學分，T001 授課
    assert.equal((await api(baseUrl, 'POST', '/api/student/enrollments', stu.token, { offeringId })).status, 200);

    const { data: teacher } = await loginAs(baseUrl, 'T001', 'pass123');
    const scored = await api(baseUrl, 'POST', `/api/teacher/offerings/${offeringId}/scores`, teacher.token, {
      grades: [{ studentId: stu.id, score: 90 }],
    });
    assert.equal(scored.status, 200);

    const { status, data } = await api(baseUrl, 'GET', '/api/student/grades', stu.token);
    assert.equal(status, 200);
    assert.equal(data.gpa, 4.0);
    assert.equal(data.totalCredits, 3);
    assert.equal(data.courses.length, 1);
    assert.equal(data.courses[0].gpaPoint, 4.0);
  });
});
