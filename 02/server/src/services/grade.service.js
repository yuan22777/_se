import { getDb } from '../config/database.js';

const db = getDb();

// 教師取得當學期個人授課清單
export function listTeacherOfferings(teacherId) {
  return db
    .prepare(
      `SELECT o.id AS offering_id, o.capacity, o.enrolled_count, o.day_of_week,
              o.start_time, o.end_time, o.classroom,
              c.course_code, c.title, c.credits,
              s.academic_year, s.term, s.is_active
       FROM course_offerings o
       JOIN courses c ON c.id = o.course_id
       JOIN semesters s ON s.id = o.semester_id
       WHERE o.teacher_id = ?
       ORDER BY s.is_active DESC, o.day_of_week, o.start_time`
    )
    .all(teacherId);
}

// 教師取得該門課學生名冊
export function listOfferingStudents(teacherId, offeringId) {
  const offering = db
    .prepare('SELECT id, teacher_id FROM course_offerings WHERE id = ?')
    .get(offeringId);
  if (!offering) {
    const err = new Error('找不到該門課程');
    err.status = 404;
    throw err;
  }
  if (offering.teacher_id !== teacherId) {
    const err = new Error('您無權檢視非您授課的學生名冊');
    err.status = 403;
    throw err;
  }

  return db
    .prepare(
      `SELECT u.id AS student_id, u.username, u.full_name, u.email,
              e.score, e.status, e.created_at
       FROM enrollments e
       JOIN users u ON u.id = e.student_id
       WHERE e.offering_id = ? AND e.status = 'ENROLLED'
       ORDER BY u.username`
    )
    .all(offeringId);
}

// 教師批次登錄 / 更新成績
export function batchUpdateScores(teacherId, offeringId, gradesList) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const offering = db
      .prepare('SELECT id, teacher_id FROM course_offerings WHERE id = ?')
      .get(offeringId);
    if (!offering) {
      const err = new Error('找不到該門課程');
      err.status = 404;
      throw err;
    }
    if (offering.teacher_id !== teacherId) {
      const err = new Error('您無權限修改非您授課的成績紀錄');
      err.status = 403;
      throw err;
    }

    for (const item of gradesList) {
      if (typeof item.score !== 'number' && !(item.score instanceof Number)) {
        const err = new Error('成績必須為數字');
        err.status = 400;
        throw err;
      }
      if (item.score < 0 || item.score > 100) {
        const err = new Error('成績必須介於 0~100 之間');
        err.status = 400;
        throw err;
      }
      const info = db
        .prepare(
          `UPDATE enrollments SET score = ?
           WHERE student_id = ? AND offering_id = ?`
        )
        .run(item.score, item.studentId, offeringId);
      if (info.changes === 0) {
        const err = new Error(`學生 ${item.studentId} 未選修此課程`);
        err.status = 400;
        throw err;
      }
    }

    db.exec('COMMIT');
    return { message: '成績批次更新成功' };
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}