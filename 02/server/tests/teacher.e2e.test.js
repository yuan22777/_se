/**
 * E2E：教師 API
 * 涵蓋：授課清單、學生名冊、批次成績登錄、越權阻擋、成績驗證。
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import { snapshotDb, restoreDb, startServer, stopServer, api, loginAs } from './helpers/e2e.js';

describe('教師 API (E2E)', () => {
  let baseUrl;
  let server;
  let t1Token;
  let t2Token;

  before(async () => {
    snapshotDb();
    ({ server, baseUrl } = await startServer(app));
    t1Token = (await loginAs(baseUrl, 'T001', 'pass123')).data.token;
    t2Token = (await loginAs(baseUrl, 'T002', 'pass123')).data.token;
  });

  after(async () => {
    await stopServer(server);
    await restoreDb();
  });

  it('T001 授課清單 5 筆，欄位完整', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/teacher/offerings', t1Token);
    assert.equal(status, 200);
    assert.equal(data.length, 5);
    for (const o of data) {
      assert.ok(o.offering_id);
      assert.ok(o.course_code);
      assert.ok(o.title);
    }
  });

  it('學生名冊：結構正確且皆為 ENROLLED', async () => {
    const { status, data } = await api(baseUrl, 'GET', '/api/teacher/offerings/1/students', t1Token);
    assert.equal(status, 200);
    assert.ok(data.length > 0);
    for (const s of data) {
      assert.ok(s.student_id);
      assert.ok(s.username);
      assert.equal(s.status, 'ENROLLED');
    }
  });

  it('看不到別的教師的課：404 / 403', async () => {
    // 開課 2 由 T002 授課，T001 無權檢視
    const forbidden = await api(baseUrl, 'GET', '/api/teacher/offerings/2/students', t1Token);
    assert.equal(forbidden.status, 403);

    const notFound = await api(baseUrl, 'GET', '/api/teacher/offerings/99999/students', t1Token);
    assert.equal(notFound.status, 404);
  });

  it('批次登錄成績成功且可被學生查到', async () => {
    const roster = await api(baseUrl, 'GET', '/api/teacher/offerings/1/students', t1Token);
    const target = roster.data[0];

    const r = await api(baseUrl, 'POST', '/api/teacher/offerings/1/scores', t1Token, {
      grades: [{ studentId: target.student_id, score: 77 }],
    });
    assert.equal(r.status, 200);

    const after = await api(baseUrl, 'GET', '/api/teacher/offerings/1/students', t1Token);
    assert.equal(after.data.find((s) => s.student_id === target.student_id).score, 77);
  });

  it('成績驗證：範圍、格式、選修關係', async () => {
    const over = await api(baseUrl, 'POST', '/api/teacher/offerings/1/scores', t1Token, {
      grades: [{ studentId: 4, score: 101 }],
    });
    assert.equal(over.status, 400);

    const negative = await api(baseUrl, 'POST', '/api/teacher/offerings/1/scores', t1Token, {
      grades: [{ studentId: 4, score: -1 }],
    });
    assert.equal(negative.status, 400);

    const notArray = await api(baseUrl, 'POST', '/api/teacher/offerings/1/scores', t1Token, {
      grades: 'oops',
    });
    assert.equal(notArray.status, 400);

    const notEnrolled = await api(baseUrl, 'POST', '/api/teacher/offerings/1/scores', t1Token, {
      grades: [{ studentId: 99999, score: 80 }],
    });
    assert.equal(notEnrolled.status, 400);
  });

  it('不可改別的教師的課的成績', async () => {
    const r = await api(baseUrl, 'POST', '/api/teacher/offerings/2/scores', t1Token, {
      grades: [{ studentId: 4, score: 80 }],
    });
    assert.equal(r.status, 403);
  });

  it('T002 可改自己的課；學生打教師 API 被 403', async () => {
    const roster = await api(baseUrl, 'GET', '/api/teacher/offerings/2/students', t2Token);
    assert.equal(roster.status, 200);
    if (roster.data.length > 0) {
      const r = await api(baseUrl, 'POST', '/api/teacher/offerings/2/scores', t2Token, {
        grades: [{ studentId: roster.data[0].student_id, score: 85 }],
      });
      assert.equal(r.status, 200);
    }

    const { data: student } = await loginAs(baseUrl, 'S001', 'pass123');
    const forbidden = await api(baseUrl, 'GET', '/api/teacher/offerings', student.token);
    assert.equal(forbidden.status, 403);
  });
});
