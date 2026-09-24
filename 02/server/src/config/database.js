import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

export function getDb() {
  if (!db) {
    db = new DatabaseSync(join(__dirname, '..', '..', '..', 'school.db'));
    db.exec('PRAGMA foreign_keys = ON;');
    initSchema();
  }
  return db;
}

function initSchema() {
  const schema = readFileSync(join(__dirname, '..', '..', 'db', 'schema.sql'), 'utf-8');
  db.exec(schema);
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}