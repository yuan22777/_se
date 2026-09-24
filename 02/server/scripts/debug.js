import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';
const db = new DatabaseSync(join('..', 'school.db'));
console.log('users:');
console.table(db.prepare('SELECT id, username, role FROM users').all());
console.log('offerings:');
console.table(db.prepare('SELECT id, course_id, teacher_id, capacity, enrolled_count FROM course_offerings LIMIT 3').all());