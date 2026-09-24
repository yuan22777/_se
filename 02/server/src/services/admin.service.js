import bcrypt from 'bcryptjs';
import { getDb } from '../config/database.js';

const db = getDb();

export function listUsers({ role } = {}) {
  if (role) {
    return db
      .prepare('SELECT id, username, email, full_name, role, created_at FROM users WHERE role = ?')
      .all(role);
  }
  return db
    .prepare('SELECT id, username, email, full_name, role, created_at FROM users')
    .all();
}

export function createUser({ username, email, password, fullName, role }) {
  // 檢查重複
  const dup = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
  if (dup) {
    const err = new Error('帳號或 Email 已存在');
    err.status = 400;
    throw err;
  }

  const passwordHash = bcrypt.hashSync(password || 'pass123', 10);
  const info = db
    .prepare('INSERT INTO users (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)')
    .run(username, email, passwordHash, fullName, role);
  return { id: info.lastInsertRowid, username, email, fullName, role };
}

export function batchImportUsers(rows) {
  const results = { success: 0, errors: [] };
  for (const row of rows) {
    try {
      createUser(row);
      results.success += 1;
    } catch (e) {
      results.errors.push({ username: row.username, message: e.message });
    }
  }
  return results;
}

export function deleteUser(userId) {
  // 檢查是否被引用 (教師開課 / 學生選課)
  const teaching = db.prepare('SELECT COUNT(*) AS c FROM course_offerings WHERE teacher_id = ?').get(userId);
  if (teaching.c > 0) {
    const err = new Error('該教師已有開課紀錄，無法刪除');
    err.status = 400;
    throw err;
  }
  const enrolling = db.prepare('SELECT COUNT(*) AS c FROM enrollments WHERE student_id = ?').get(userId);
  if (enrolling.c > 0) {
    const err = new Error('該學生已有選課紀錄，無法刪除');
    err.status = 400;
    throw err;
  }
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(userId);
  if (info.changes === 0) {
    const err = new Error('使用者不存在');
    err.status = 404;
    throw err;
  }
  return { message: '刪除成功' };
}

export function listSemesters() {
  return db.prepare('SELECT * FROM semesters ORDER BY academic_year DESC, term DESC').all();
}

export function createSemester({ academicYear, term }) {
  const dup = db.prepare('SELECT id FROM semesters WHERE academic_year = ? AND term = ?').get(academicYear, term);
  if (dup) {
    const err = new Error('該學期已存在');
    err.status = 400;
    throw err;
  }
  const info = db
    .prepare('INSERT INTO semesters (academic_year, term, is_active) VALUES (?, ?, 0)')
    .run(academicYear, term);
  return { id: info.lastInsertRowid, academicYear, term, isActive: false };
}

export function activateSemester(semesterId) {
  db.exec('BEGIN IMMEDIATE');
  try {
    db.prepare('UPDATE semesters SET is_active = 0').run();
    const info = db.prepare('UPDATE semesters SET is_active = 1 WHERE id = ?').run(semesterId);
    if (info.changes === 0) {
      const err = new Error('學期不存在');
      err.status = 404;
      throw err;
    }
    db.exec('COMMIT');
    return { message: '已設定為當前學期' };
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

export function listOfferings() {
  return db
    .prepare(
      `SELECT o.id, o.semester_id, o.capacity, o.enrolled_count, o.day_of_week,
              o.start_time, o.end_time, o.classroom,
              c.id AS course_id, c.course_code, c.title, c.credits,
              u.full_name AS teacher_name, s.academic_year, s.term, s.is_active
       FROM course_offerings o
       JOIN courses c ON c.id = o.course_id
       JOIN users u ON u.id = o.teacher_id
       JOIN semesters s ON s.id = o.semester_id
       ORDER BY o.semester_id, o.day_of_week, o.start_time`
    )
    .all();
}

export function createOffering({ semesterId, courseId, teacherId, capacity, dayOfWeek, startTime, endTime, classroom }) {
  // 驗證 teacher 是 TEACHER
  const teacher = db.prepare('SELECT id, role FROM users WHERE id = ?').get(teacherId);
  if (!teacher || teacher.role !== 'TEACHER') {
    const err = new Error('授課教師不存在或不是教師');
    err.status = 400;
    throw err;
  }

  // 驗證 course
  const course = db.prepare('SELECT id FROM courses WHERE id = ?').get(courseId);
  if (!course) {
    const err = new Error('課程不存在');
    err.status = 400;
    throw err;
  }

  const info = db
    .prepare(
      `INSERT INTO course_offerings
       (semester_id, course_id, teacher_id, capacity, day_of_week, start_time, end_time, classroom)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(semesterId, courseId, teacherId, capacity, dayOfWeek, startTime, endTime, classroom);
  return { id: info.lastInsertRowid };
}

export function deleteOffering(offeringId) {
  const enrolling = db.prepare('SELECT COUNT(*) AS c FROM enrollments WHERE offering_id = ?').get(offeringId);
  if (enrolling.c > 0) {
    const err = new Error('該課程已有學生選課，無法刪除');
    err.status = 400;
    throw err;
  }
  const info = db.prepare('DELETE FROM course_offerings WHERE id = ?').run(offeringId);
  if (info.changes === 0) {
    const err = new Error('開課紀錄不存在');
    err.status = 404;
    throw err;
  }
  return { message: '刪除成功' };
}

export function listCourses() {
  return db.prepare('SELECT * FROM courses ORDER BY id').all();
}

export function createCourse({ courseCode, title, credits, description }) {
  const dup = db.prepare('SELECT id FROM courses WHERE course_code = ?').get(courseCode);
  if (dup) {
    const err = new Error('課程代碼已存在');
    err.status = 400;
    throw err;
  }
  const info = db
    .prepare('INSERT INTO courses (course_code, title, credits, description) VALUES (?, ?, ?, ?)')
    .run(courseCode, title, credits, description);
  return { id: info.lastInsertRowid, courseCode, title, credits, description };
}