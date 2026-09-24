#!/usr/bin/env python3
"""
校務行政系統 MVP - 種子資料產生腳本
產生 SQLite 相容的 SQL INSERT 語句，寫入 seed.sql
使用真實 bcrypt hash (密碼可正常登入)
"""

import bcrypt
import random
import datetime

# ── 密碼 hash (每次執行重新產生，成本 rounds=12) ──
ADMIN_HASH = bcrypt.hashpw(b"admin123", bcrypt.gensalt(12)).decode()
TEACHER_HASH = bcrypt.hashpw(b"pass123", bcrypt.gensalt(12)).decode()
STUDENT_HASH = bcrypt.hashpw(b"pass123", bcrypt.gensalt(12)).decode()

# ── 中文姓名資料 ──
SURNAMES = ["王", "李", "張", "陳", "黃", "林", "劉", "蔡", "吳", "鄭",
            "曾", "蕭", "廖", "姚", "賴", "蘇", "洪", "邱", "徐", "何"]
GIVEN_NAMES_M = ["志明", "建宏", "俊傑", "家豪", "宗翰", "承恩", "冠宇",
                 "柏翰", "彥廷", "子軒", "文傑", "國維", "偉成", "志偉", "明哲"]
GIVEN_NAMES_F = ["美玲", "淑芬", "雅婷", "怡君", "佳蓉", "思穎", "雅涵",
                 "心怡", "宜臻", "品妤", "芷涵", "靜宜", "詠琪", "詩涵", "筱涵"]

ROOMS = ["博愛樓 101", "博愛樓 202", "博愛樓 305", "人文館 103", "人文館 201",
         "理學院 401", "理學院 405", "工學院 102", "工學院 301", "工學院 202"]

COURSES = [
    ("CS101", "計算機概論", 3, "計算機科學入課程，涵蓋硬體架構與基本演算法概念"),
    ("CS201", "資料結構", 3, "陣列、鏈結串列、堆疊、佇列、樹、圖等基礎資料結構"),
    ("CS301", "演算法設計", 3, "分治法、動態規劃、貪婪法、圖論演算法分析與設計"),
    ("MATH101", "微積分(一)", 3, "極限、導數、積分基本理論與應用"),
    ("MATH201", "線性代數", 3, "矩陣運算、向量空間、特徵值與特徵向量"),
    ("ENG101", "英文(一)", 2, "學術英文閱讀與寫作訓練"),
    ("ENG201", "英文(二)", 2, "進階英文聽說讀寫綜合訓練"),
    ("PHYS101", "普通物理學(一)", 3, "力學、熱學基礎物理概念"),
    ("CS102", "程式設計(一)", 2, "Python 程式設計基礎入門"),
    ("CS202", "資料庫系統", 3, "關聯式資料庫設計、SQL 語句與正規化理論"),
]

# 開課時段設定 (避免衝堂的時段)
TIME_SLOTS = [
    (1, "09:00", "10:30"),   # 週一 9:00-10:30
    (1, "13:00", "14:30"),   # 週一 13:00-14:30
    (2, "09:00", "10:30"),   # 週二 9:00-10:30
    (2, "11:00", "12:30"),   # 週二 11:00-12:30
    (3, "10:00", "11:30"),   # 週三 10:00-11:30
    (3, "14:00", "15:30"),   # 週三 14:00-15:30
    (4, "09:00", "10:30"),   # 週四 9:00-10:30
    (4, "13:00", "14:30"),   # 週四 13:00-14:30
    (5, "10:00", "11:30"),   # 週五 10:00-11:30
    (5, "14:00", "15:30"),   # 週五 14:00-15:30
]

def random_name():
    surname = random.choice(SURNAMES)
    given = random.choice(GIVEN_NAMES_M + GIVEN_NAMES_F)
    return surname + given

def escape_sql(s):
    """Escape single quotes for SQL."""
    return s.replace("'", "''")

def generate():
    random.seed(42)  # 固定種子，確保每次產生相同的假資料

    lines = []
    lines.append("-- =============================================")
    lines.append("-- 校務行政系統 MVP 種子資料 (Seed Data)")
    lines.append("-- 由 generate_seed.py 自動產生 (SQLite 相容)")
    lines.append(f"-- 產生時間: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append("-- =============================================")
    lines.append("")
    lines.append("BEGIN TRANSACTION;")
    lines.append("")

    # ── 1. Users ──
    lines.append("-- =============================================")
    lines.append("-- 1. 使用者資料 (users)")
    lines.append("-- =============================================")
    lines.append("")

    lines.append("-- 系統管理員")
    lines.append(
        f"INSERT INTO users (username, email, password_hash, full_name, role) "
        f"VALUES ('admin', 'admin@school.edu.tw', '{ADMIN_HASH}', '系統管理員', 'ADMIN');"
    )
    lines.append("")

    teachers = [
        ("T001", "teacher001@school.edu.tw", "王大明"),
        ("T002", "teacher002@school.edu.tw", "李小華"),
    ]
    lines.append("-- 教師")
    for username, email, name in teachers:
        lines.append(
            f"INSERT INTO users (username, email, password_hash, full_name, role) "
            f"VALUES ('{username}', '{email}', '{TEACHER_HASH}', '{name}', 'TEACHER');"
        )
    lines.append("")

    students = [
        ("S001", "student001@school.edu.tw"),
        ("S002", "student002@school.edu.tw"),
        ("S003", "student003@school.edu.tw"),
        ("S004", "student004@school.edu.tw"),
        ("S005", "student005@school.edu.tw"),
    ]
    lines.append("-- 學生")
    for username, email in students:
        name = random_name()
        lines.append(
            f"INSERT INTO users (username, email, password_hash, full_name, role) "
            f"VALUES ('{username}', '{email}', '{STUDENT_HASH}', '{name}', 'STUDENT');"
        )
    lines.append("")

    # ── 2. Semesters ──
    lines.append("-- =============================================")
    lines.append("-- 2. 學期資料 (semesters)")
    lines.append("-- =============================================")
    lines.append("")
    lines.append(
        "INSERT INTO semesters (academic_year, term, is_active) VALUES (114, 1, 1);"
    )
    lines.append(
        "INSERT INTO semesters (academic_year, term, is_active) VALUES (113, 2, 0);"
    )
    lines.append(
        "INSERT INTO semesters (academic_year, term, is_active) VALUES (113, 1, 0);"
    )
    lines.append("")

    # ── 3. Courses ──
    lines.append("-- =============================================")
    lines.append("-- 3. 課程主表 (courses)")
    lines.append("-- =============================================")
    lines.append("")
    for code, title, credits, desc in COURSES:
        lines.append(
            f"INSERT INTO courses (course_code, title, credits, description) "
            f"VALUES ('{code}', '{title}', {credits}, '{escape_sql(desc)}');"
        )
    lines.append("")

    # ── 4. Course Offerings ──
    lines.append("-- =============================================")
    lines.append("-- 4. 開課紀錄 (course_offerings)")
    lines.append("-- semester_id=1 為 114-1 (is_active)")
    lines.append("-- =============================================")
    lines.append("")

    offering_data = []
    for i, (code, title, credits, desc) in enumerate(COURSES):
        semester_id = 1
        course_id = i + 1
        teacher_id = (i % 2) + 2  # user_id: admin=1, T001=2, T002=3
        capacity = random.randint(30, 60)
        day, start, end = TIME_SLOTS[i]
        room = random.choice(ROOMS)
        offering_data.append((semester_id, course_id, teacher_id, capacity, day, start, end, room))

    for sid, cid, tid, cap, day, start, end, room in offering_data:
        lines.append(
            f"INSERT INTO course_offerings "
            f"(semester_id, course_id, teacher_id, capacity, enrolled_count, day_of_week, start_time, end_time, classroom) "
            f"VALUES ({sid}, {cid}, {tid}, {cap}, 0, {day}, '{start}', '{end}', '{room}');"
        )
    lines.append("")

    # ── 5. Enrollments ──
    lines.append("-- =============================================")
    lines.append("-- 5. 選課紀錄 (enrollments)")
    lines.append("-- 學生 S001-S005 隨機選 3~5 門課，部分有成績")
    lines.append("-- =============================================")
    lines.append("")

    student_enrollments = {}
    for s_idx, (s_username, s_email) in enumerate(students):
        student_id = s_idx + 4  # user_id: admin=1, T001=2, T002=3, S001=4...
        num_courses = random.randint(3, 5)
        selected = random.sample(range(1, 11), num_courses)
        student_enrollments[student_id] = selected

    for student_id, offering_ids in sorted(student_enrollments.items()):
        for oid in offering_ids:
            has_score = random.random() < 0.5
            if has_score:
                score = round(random.uniform(45, 100), 2)
                lines.append(
                    f"INSERT INTO enrollments (student_id, offering_id, score, status) "
                    f"VALUES ({student_id}, {oid}, {score}, 'ENROLLED');"
                )
            else:
                lines.append(
                    f"INSERT INTO enrollments (student_id, offering_id, status) "
                    f"VALUES ({student_id}, {oid}, 'ENROLLED');"
                )

    lines.append("")
    lines.append("COMMIT;")

    # ── 6. 計算 enrolled_count 回填 (在 COMMIT 之後更新) ──
    lines.append("")
    lines.append("-- =============================================")
    lines.append("-- 6. 回填 course_offerings.enrolled_count")
    lines.append("--    與上方選課紀錄保持一致")
    lines.append("-- =============================================")
    lines.append("")
    for oid in range(1, len(offering_data) + 1):
        count = sum(1 for ids in student_enrollments.values() if oid in ids)
        lines.append(
            f"UPDATE course_offerings SET enrolled_count = {count} WHERE id = {oid};"
        )

    lines.append("")
    lines.append("-- =============================================")
    lines.append("-- 種子資料產生完畢")
    lines.append("-- 密碼說明:")
    lines.append("--   admin   -> admin123")
    lines.append("--   T001    -> pass123")
    lines.append("--   T002    -> pass123")
    lines.append("--   S001~S005 -> pass123")
    lines.append("-- =============================================")

    return "\n".join(lines)


if __name__ == "__main__":
    sql = generate()
    output_path = "seed.sql"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(sql)
    print(f"[OK] 已產生 {output_path}")
    insert_count = sql.count("INSERT INTO")
    print(f"     INSERT 語句數: {insert_count}")