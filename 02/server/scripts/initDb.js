import { getDb, closeDb } from '../src/config/database.js';

// 僅建立 schema，不填入資料
getDb();
console.log('[OK] 資料庫 schema 已建立 (school.db)');
closeDb();