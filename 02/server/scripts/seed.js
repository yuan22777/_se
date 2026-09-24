import { getDb, closeDb } from '../src/config/database.js';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = getDb();

// 執行種子資料 (由 generate_seed.py 產生的 seed.sql)
const seed = readFileSync(join(__dirname, '..', '..', 'seed.sql'), 'utf-8');

db.exec('PRAGMA foreign_keys = OFF;');
try {
  db.exec('DELETE FROM enrollments;');
  db.exec('DELETE FROM course_offerings;');
  db.exec('DELETE FROM courses;');
  db.exec('DELETE FROM semesters;');
  db.exec('DELETE FROM users;');

  // 重置 AUTOINCREMENT 計數器，確保 user/offering id 從 1 重新開始
  db.exec("DELETE FROM sqlite_sequence WHERE name IN ('users', 'semesters', 'courses', 'course_offerings', 'enrollments');");

  // seed.sql 內含 BEGIN TRANSACTION / COMMIT
  db.exec(seed);

  console.log('[OK] 種子資料載入完成');
  const counts = db.prepare("SELECT 'users' AS t, COUNT(*) AS c FROM users UNION ALL SELECT 'semesters', COUNT(*) FROM semesters UNION ALL SELECT 'courses', COUNT(*) FROM courses UNION ALL SELECT 'course_offerings', COUNT(*) FROM course_offerings UNION ALL SELECT 'enrollments', COUNT(*) FROM enrollments").all();
  for (const row of counts) {
    console.log(`     ${row.t}: ${row.c}`);
  }
} finally {
  db.exec('PRAGMA foreign_keys = ON;');
  closeDb();
}