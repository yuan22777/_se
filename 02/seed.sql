-- =============================================
-- 校務行政系統 MVP 種子資料 (Seed Data)
-- 由 generate_seed.py 自動產生 (SQLite 相容)
-- 產生時間: 2026-09-11 11:48:52
-- =============================================

BEGIN TRANSACTION;

-- =============================================
-- 1. 使用者資料 (users)
-- =============================================

-- 系統管理員
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('admin', 'admin@school.edu.tw', '$2b$12$9b93lWigy4dLTOPQVVMx8uUysQsghvWOYxAPeM/8V/muhWJ9dx92.', '系統管理員', 'ADMIN');

-- 教師
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('T001', 'teacher001@school.edu.tw', '$2b$12$GoBHvast4c2PMNEAnjj7N.RZLhcGIiWFlsNdUq3uvX2K.Ai6/RvbO', '王大明', 'TEACHER');
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('T002', 'teacher002@school.edu.tw', '$2b$12$GoBHvast4c2PMNEAnjj7N.RZLhcGIiWFlsNdUq3uvX2K.Ai6/RvbO', '李小華', 'TEACHER');

-- 學生
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('S001', 'student001@school.edu.tw', '$2b$12$JFlXwf6IwJHGoLsBK1mhguqZNBJUzwyHUow5.q99hJqVEIBhSycCG', '陳志明', 'STUDENT');
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('S002', 'student002@school.edu.tw', '$2b$12$JFlXwf6IwJHGoLsBK1mhguqZNBJUzwyHUow5.q99hJqVEIBhSycCG', '吳柏翰', 'STUDENT');
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('S003', 'student003@school.edu.tw', '$2b$12$JFlXwf6IwJHGoLsBK1mhguqZNBJUzwyHUow5.q99hJqVEIBhSycCG', '蔡宗翰', 'STUDENT');
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('S004', 'student004@school.edu.tw', '$2b$12$JFlXwf6IwJHGoLsBK1mhguqZNBJUzwyHUow5.q99hJqVEIBhSycCG', '陳雅涵', 'STUDENT');
INSERT INTO users (username, email, password_hash, full_name, role) VALUES ('S005', 'student005@school.edu.tw', '$2b$12$JFlXwf6IwJHGoLsBK1mhguqZNBJUzwyHUow5.q99hJqVEIBhSycCG', '邱俊傑', 'STUDENT');

-- =============================================
-- 2. 學期資料 (semesters)
-- =============================================

INSERT INTO semesters (academic_year, term, is_active) VALUES (114, 1, 1);
INSERT INTO semesters (academic_year, term, is_active) VALUES (113, 2, 0);
INSERT INTO semesters (academic_year, term, is_active) VALUES (113, 1, 0);

-- =============================================
-- 3. 課程主表 (courses)
-- =============================================

INSERT INTO courses (course_code, title, credits, description) VALUES ('CS101', '計算機概論', 3, '計算機科學入課程，涵蓋硬體架構與基本演算法概念');
INSERT INTO courses (course_code, title, credits, description) VALUES ('CS201', '資料結構', 3, '陣列、鏈結串列、堆疊、佇列、樹、圖等基礎資料結構');
INSERT INTO courses (course_code, title, credits, description) VALUES ('CS301', '演算法設計', 3, '分治法、動態規劃、貪婪法、圖論演算法分析與設計');
INSERT INTO courses (course_code, title, credits, description) VALUES ('MATH101', '微積分(一)', 3, '極限、導數、積分基本理論與應用');
INSERT INTO courses (course_code, title, credits, description) VALUES ('MATH201', '線性代數', 3, '矩陣運算、向量空間、特徵值與特徵向量');
INSERT INTO courses (course_code, title, credits, description) VALUES ('ENG101', '英文(一)', 2, '學術英文閱讀與寫作訓練');
INSERT INTO courses (course_code, title, credits, description) VALUES ('ENG201', '英文(二)', 2, '進階英文聽說讀寫綜合訓練');
INSERT INTO courses (course_code, title, credits, description) VALUES ('PHYS101', '普通物理學(一)', 3, '力學、熱學基礎物理概念');
INSERT INTO courses (course_code, title, credits, description) VALUES ('CS102', '程式設計(一)', 2, 'Python 程式設計基礎入門');
INSERT INTO courses (course_code, title, credits, description) VALUES ('CS202', '資料庫系統', 3, '關聯式資料庫設計、SQL 語句與正規化理論');

-- =============================================
-- 4. 開課紀錄 (course_offerings)
-- semester_id=1 為 114-1 (is_active)
-- =============================================

INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 1, 2, 48, 0, 1, '09:00', '10:30', '理學院 405');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 2, 3, 31, 0, 1, '13:00', '14:30', '博愛樓 101');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 3, 2, 32, 0, 2, '09:00', '10:30', '人文館 103');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 4, 3, 37, 0, 2, '11:00', '12:30', '工學院 301');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 5, 2, 49, 0, 3, '10:00', '11:30', '博愛樓 101');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 6, 3, 47, 0, 3, '14:00', '15:30', '人文館 103');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 7, 2, 52, 0, 4, '09:00', '10:30', '工學院 301');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 8, 3, 43, 0, 4, '13:00', '14:30', '人文館 103');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 9, 2, 44, 0, 5, '10:00', '11:30', '工學院 202');
INSERT INTO course_offerings (semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) VALUES (1, 10, 3, 38, 0, 5, '14:00', '15:30', '博愛樓 101');

-- =============================================
-- 5. 選課紀錄 (enrollments)
-- 學生 S001-S005 隨機選 3~5 門課，部分有成績
-- =============================================

INSERT INTO enrollments (student_id, offering_id, status) VALUES (4, 7, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (4, 6, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (4, 5, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (5, 4, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (5, 6, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (5, 2, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (6, 7, 57.53, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (6, 2, 49.39, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (6, 6, 50.56, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (7, 10, 79.96, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (7, 5, 65.36, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (7, 1, 59.68, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (7, 6, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (8, 9, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, status) VALUES (8, 2, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (8, 7, 85.1, 'ENROLLED');
INSERT INTO enrollments (student_id, offering_id, score, status) VALUES (8, 1, 65.87, 'ENROLLED');

COMMIT;

-- =============================================
-- 6. 回填 course_offerings.enrolled_count
--    與上方選課紀錄保持一致
-- =============================================

UPDATE course_offerings SET enrolled_count = 2 WHERE id = 1;
UPDATE course_offerings SET enrolled_count = 3 WHERE id = 2;
UPDATE course_offerings SET enrolled_count = 0 WHERE id = 3;
UPDATE course_offerings SET enrolled_count = 1 WHERE id = 4;
UPDATE course_offerings SET enrolled_count = 2 WHERE id = 5;
UPDATE course_offerings SET enrolled_count = 4 WHERE id = 6;
UPDATE course_offerings SET enrolled_count = 3 WHERE id = 7;
UPDATE course_offerings SET enrolled_count = 0 WHERE id = 8;
UPDATE course_offerings SET enrolled_count = 1 WHERE id = 9;
UPDATE course_offerings SET enrolled_count = 1 WHERE id = 10;

-- =============================================
-- 種子資料產生完畢
-- 密碼說明:
--   admin   -> admin123
--   T001    -> pass123
--   T002    -> pass123
--   S001~S005 -> pass123
-- =============================================