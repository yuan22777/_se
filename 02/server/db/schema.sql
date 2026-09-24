-- 校務行政系統 MVP - SQLite Schema
-- 使用方式: node scripts/initDb.js

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'TEACHER', 'STUDENT')),
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS semesters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    academic_year INTEGER NOT NULL,
    term INTEGER NOT NULL CHECK (term IN (1, 2)),
    is_active INTEGER DEFAULT 0,
    UNIQUE (academic_year, term)
);

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL DEFAULT 3,
    description TEXT
);

CREATE TABLE IF NOT EXISTS course_offerings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    semester_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    enrolled_count INTEGER NOT NULL DEFAULT 0,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    classroom TEXT,
    FOREIGN KEY (semester_id) REFERENCES semesters(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    offering_id INTEGER NOT NULL,
    score REAL,
    status TEXT NOT NULL DEFAULT 'ENROLLED' CHECK (status IN ('ENROLLED', 'DROPPED')),
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    UNIQUE (student_id, offering_id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (offering_id) REFERENCES course_offerings(id)
);