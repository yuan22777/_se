import { getDb } from '../config/database.js';

const db = getDb();

// 取得「當前開放學期」的選課
function getActiveSemesterId() {
  const row = db.prepare('SELECT id FROM semesters WHERE is_active = 1').get();
  if (!row) {
    const err = new Error('尚未設定當前開放學期');
    err.status = 400;
    throw err;
  }
  return row.id;
}

// 學生可選課程清單 (當學期)
export function listStudentOfferings(studentId) {
  const semesterId = getActiveSemesterId();

  const offerings = db
    .prepare(
      `SELECT o.id AS offering_id, o.capacity, o.enrolled_count, o.day_of_week,
              o.start_time, o.end_time, o.classroom,
              c.course_code, c.title, c.credits,
              u.full_name AS teacher_name,
              (o.capacity - o.enrolled_count) AS seats_left
       FROM course_offerings o
       JOIN courses c ON c.id = o.course_id
       JOIN users u ON u.id = o.teacher_id
       WHERE o.semester_id = ?
       ORDER BY o.day_of_week, o.start_time`
    )
    .all(semesterId);

  // 標示學生已選課程
  const enrolled = db
    .prepare(
      `SELECT offering_id FROM enrollments
       WHERE student_id = ? AND status = 'ENROLLED'`
    )
    .all(studentId)
    .map((r) => r.offering_id);
  const enrolledSet = new Set(enrolled);

  return offerings.map((o) => ({
    ...o,
    alreadyEnrolled: enrolledSet.has(o.offering_id),
  }));
}

// 學生加選課程 (含衝堂檢查 + 名額檢查)
export function enrollCourse(studentId, offeringId) {
  // 使用交易保證原子性
  db.exec('BEGIN IMMEDIATE');
  try {
    // 1. 取得目標課程
    const offering = db
      .prepare('SELECT * FROM course_offerings WHERE id = ?')
      .get(offeringId);
    if (!offering) {
      const err = new Error('找不到該門課程');
      err.status = 404;
      throw err;
    }

    // 2. 只能選當前學期的課
    const active = db.prepare('SELECT id FROM semesters WHERE is_active = 1').get();
    if (!active || offering.semester_id !== active.id) {
      const err = new Error('只能選修當前開放學期的課程');
      err.status = 400;
      throw err;
    }

    // 2b. 原子更新名額：UPDATE ... WHERE enrolled_count < capacity (affected rows = 0 代表額滿)
    const updateResult = db
      .prepare(
        `UPDATE course_offerings
         SET enrolled_count = enrolled_count + 1
         WHERE id = ? AND enrolled_count < capacity`
      )
      .run(offeringId);
    if (updateResult.changes === 0) {
      const err = new Error('課程名額已滿，無法加選');
      err.status = 400;
      throw err;
    }

    // 3. 檢查是否已選過
    const existing = db
      .prepare(
        `SELECT id FROM enrollments
         WHERE student_id = ? AND offering_id = ? AND status = 'ENROLLED'`
      )
      .get(studentId, offeringId);
    if (existing) {
      const err = new Error('您已經選過此課程');
      err.status = 400;
      throw err;
    }

    // 4. 時間衝堂檢查：撈出學生當前學期已選的所有課程
    const currentEnrollments = db
      .prepare(
        `SELECT c.title, o.day_of_week, o.start_time, o.end_time, o.id AS offering_id
         FROM enrollments e
         JOIN course_offerings o ON o.id = e.offering_id
         JOIN courses c ON c.id = o.course_id
         WHERE e.student_id = ? AND e.status = 'ENROLLED'
           AND o.semester_id = ? AND o.id != ?`
      )
      .all(studentId, offering.semester_id, offeringId);

    for (const enrolled of currentEnrollments) {
      if (enrolled.day_of_week === offering.day_of_week) {
        if (
          offering.start_time < enrolled.end_time &&
          offering.end_time > enrolled.start_time
        ) {
          const err = new Error(`時間衝堂！與已選課程「${enrolled.title}」的上課時間重疊。`);
          err.status = 400;
          throw err;
        }
      }
    }

    // 5. 寫入選課紀錄
    db.prepare(
      'INSERT INTO enrollments (student_id, offering_id, status) VALUES (?, ?, ?)'
    ).run(studentId, offeringId, 'ENROLLED');

    db.exec('COMMIT');
    return { message: '加選成功！' };
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

// 學生退選
export function dropCourse(studentId, offeringId) {
  db.exec('BEGIN IMMEDIATE');
  try {
    // 檢查是否已選
    const existing = db
      .prepare(
        `SELECT id FROM enrollments
         WHERE student_id = ? AND offering_id = ? AND status = 'ENROLLED'`
      )
      .get(studentId, offeringId);
    if (!existing) {
      const err = new Error('您尚未選修此課程');
      err.status = 400;
      throw err;
    }

    db.prepare(
      `UPDATE enrollments SET status = 'DROPPED' WHERE student_id = ? AND offering_id = ?`
    ).run(studentId, offeringId);

    // 回扣名額
    db.prepare(
      'UPDATE course_offerings SET enrolled_count = MAX(enrolled_count - 1, 0) WHERE id = ?'
    ).run(offeringId);

    db.exec('COMMIT');
    return { message: '退選成功！' };
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

const DAYS = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日'];

// 學生當學期週課表
export function getStudentSchedule(studentId) {
  const semesterId = getActiveSemesterId();

  const rows = db
    .prepare(
      `SELECT c.title, c.course_code, o.day_of_week, o.start_time, o.end_time, o.classroom,
              u.full_name AS teacher_name, o.id AS offering_id
       FROM enrollments e
       JOIN course_offerings o ON o.id = e.offering_id
       JOIN courses c ON c.id = o.course_id
       JOIN users u ON u.id = o.teacher_id
       WHERE e.student_id = ? AND e.status = 'ENROLLED' AND o.semester_id = ?
       ORDER BY o.day_of_week, o.start_time`
    )
    .all(studentId, semesterId);

  return rows.map((r) => ({
    ...r,
    dayLabel: DAYS[r.day_of_week],
  }));
}

// 學生歷年成績 + GPA
export function getStudentGrades(studentId) {
  const rows = db
    .prepare(
      `SELECT c.title, c.course_code, c.credits, e.score, e.status,
              o.day_of_week, o.start_time,
              u.full_name AS teacher_name,
              s.academic_year, s.term
       FROM enrollments e
       JOIN course_offerings o ON o.id = e.offering_id
       JOIN courses c ON c.id = o.course_id
       JOIN users u ON u.id = o.teacher_id
       JOIN semesters s ON s.id = o.semester_id
       WHERE e.student_id = ? AND e.score IS NOT NULL
       ORDER BY s.academic_year DESC, s.term DESC, c.course_code`
    )
    .all(studentId);

  // GPA 計算 (4.0 制加權)
  let totalPoints = 0;
  let totalCredits = 0;
  for (const row of rows) {
    const gpa = scoreToGpa(row.score);
    totalPoints += gpa * row.credits;
    totalCredits += row.credits;
  }
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    gpa: Number(gpa.toFixed(2)),
    totalCredits,
    courses: rows.map((r) => ({
      ...r,
      gpaPoint: scoreToGpa(r.score),
    })),
  };
}

export function scoreToGpa(score) {
  if (score >= 90) return 4.0;
  if (score >= 85) return 3.7;
  if (score >= 80) return 3.3;
  if (score >= 75) return 3.0;
  if (score >= 70) return 2.7;
  if (score >= 65) return 2.3;
  if (score >= 60) return 2.0;
  return 0;
}