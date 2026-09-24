# 校務行政系統 MVP 實作規劃

## 技術棧

| 層級 | 技術 | 說明 |
|------|------|------|
| 前端 | React 18 + TypeScript + Vite | SPA 框架 |
| UI 框架 | Ant Design 5.x | 表格、表單、佈局元件 |
| HTTP 客戶端 | Axios | 前端 API 呼叫 |
| 後端 | Node.js + Express + TypeScript | REST API 伺服器 |
| ORM | Prisma | 型別安全、Migration |
| 資料庫 | SQLite (MVP) | 輕量、免安裝、可離線開發 |
| 認證 | JWT (jsonwebtoken + bcryptjs) | 無狀態權杖驗證 |
| 驗證 | Zod | 請求 Body / Params 驗證 |
| 開發工具 | tsx (dev runner)、nodemon | 熱重載開發 |

---

## 專案目錄結構

```
02/
├── generate_seed.py           # Python 種子資料產生腳本
├── seed.sql                   # 由 generate_seed.py 產生的 SQL INSERT 檔
├── server/
│   ├── prisma/
│   │   └── schema.prisma            # 資料庫 Schema 定義
│   │   └── seed.ts                  # 初始化種子資料
│   ├── src/
│   │   ├── index.ts                 # Express 入口、啟動伺服器
│   │   ├── app.ts                   # Express app 設定 (cors, json, routes)
│   │   ├── config/
│   │   │   └── database.ts          # Prisma Client 單例
│   │   ├── middlewares/
│   │   │   ├── auth.ts              # JWT authenticate + authorize
│   │   │   └── validate.ts          # Zod schema 驗證 middleware
│   │   ├── routes/
│   │   │   ├── auth.routes.ts       # POST /api/auth/login, /reset-password
│   │   │   ├── admin.routes.ts      # /api/admin/* 串接 admin 控制器
│   │   │   ├── student.routes.ts    # /api/student/* 選課、成績查詢
│   │   │   └── teacher.routes.ts    # /api/teacher/* 成績登記、名冊
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── admin.controller.ts
│   │   │   ├── student.controller.ts
│   │   │   └── teacher.controller.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── admin.service.ts
│   │   │   ├── enrollment.service.ts  # 選課核心邏輯（衝堂 + 防超賣）
│   │   │   └── grade.service.ts       # 成績批次更新
│   │   └── validators/
│   │       ├── auth.schema.ts
│   │       ├── admin.schema.ts
│   │       └── enrollment.schema.ts
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── main.tsx                 # React 入口
│   │   ├── App.tsx                  # React Router 路由定義
│   │   ├── api/
│   │   │   └── client.ts           # Axios 實例 (baseURL, interceptors)
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx      # 全域登入狀態 + JWT 管理
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── UserManagement.tsx    # 學生/教師 CRUD
│   │   │   │   ├── SemesterManagement.tsx
│   │   │   │   └── CourseOfferingManagement.tsx  # 開課管理
│   │   │   ├── student/
│   │   │   │   ├── CourseSelection.tsx   # 線上選課頁面
│   │   │   │   ├── MySchedule.tsx        # 週課表
│   │   │   │   └── MyGrades.tsx          # 成績查詢 + GPA
│   │   │   └── teacher/
│   │   │       ├── MyCourses.tsx         # 授課清單
│   │   │       └── GradeEntry.tsx        # 成績登錄頁面
│   │   └── components/
│   │       └── ProtectedRoute.tsx  # 路由守衛 (角色檢查)
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## 資料庫 Schema (Prisma)

```prisma
// server/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")   // file:./dev.db
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
}

enum EnrollmentStatus {
  ENROLLED
  DROPPED
}

model User {
  id           Int      @id @default(autoincrement())
  username     String   @unique    // 學號 / 教工號
  email        String   @unique
  passwordHash String   @map("password_hash")
  fullName     String   @map("full_name")
  role         Role
  createdAt    DateTime @default(now()) @map("created_at")

  // Teacher relation: 該教師所開的課
  taughtOfferings CourseOffering[] @relation("TeacherOfferings")

  // Student relation: 該學生的選課紀錄
  enrollments Enrollment[] @relation("StudentEnrollments")

  @@map("users")
}

model Semester {
  id           Int      @id @default(autoincrement())
  academicYear Int      @map("academic_year")
  term         Int      // 1: 上學期, 2: 下學期
  isActive     Boolean  @default(false) @map("is_active")

  offerings CourseOffering[]

  @@unique([academicYear, term])
  @@map("semesters")
}

model Course {
  id          Int    @id @default(autoincrement())
  courseCode  String @unique @map("course_code")  // CS101
  title       String
  credits     Int    @default(3)
  description String?

  offerings CourseOffering[]

  @@map("courses")
}

model CourseOffering {
  id             Int    @id @default(autoincrement())
  semesterId     Int    @map("semester_id")
  courseId        Int    @map("course_id")
  teacherId      Int    @map("teacher_id")
  capacity       Int
  enrolledCount  Int    @default(0) @map("enrolled_count")
  dayOfWeek      Int    @map("day_of_week")  // 1(週一)~7(週日)
  startTime      String @map("start_time")   // "09:00" (HH:mm)
  endTime        String @map("end_time")     // "12:00"
  classroom      String?

  semester  Semester       @relation(fields: [semesterId], references: [id])
  course    Course         @relation(fields: [courseId], references: [id])
  teacher   User           @relation("TeacherOfferings", fields: [teacherId], references: [id])
  enrollments Enrollment[]

  @@map("course_offerings")
}

model Enrollment {
  id          Int              @id @default(autoincrement())
  studentId   Int              @map("student_id")
  offeringId  Int              @map("offering_id")
  score       Float?           // NULL = 未登錄成績
  status      EnrollmentStatus @default(ENROLLED)
  createdAt   DateTime         @default(now()) @map("created_at")

  student  User           @relation("StudentEnrollments", fields: [studentId], references: [id])
  offering CourseOffering @relation(fields: [offeringId], references: [id])

  @@unique([studentId, offeringId])
  @@map("enrollments")
}
```

---

## 核心 API 清單

### 認證 (Auth)

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| POST | `/api/auth/login` | 登入，回傳 JWT | 公開 |
| POST | `/api/auth/reset-password` | 密碼重設 | 已登入 |

### 管理員 (Admin)

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| GET | `/api/admin/users` | 取得所有使用者（支援 `?role=` 篩選） | ADMIN |
| POST | `/api/admin/users` | 新增單一使用者 | ADMIN |
| POST | `/api/admin/users/batch-import` | CSV 批次匯入 | ADMIN |
| DELETE | `/api/admin/users/:id` | 刪除使用者 | ADMIN |
| GET | `/api/admin/semesters` | 取得學期列表 | ADMIN |
| POST | `/api/admin/semesters` | 新增學期 | ADMIN |
| PATCH | `/api/admin/semesters/:id/activate` | 設定當前開放學期 | ADMIN |
| GET | `/api/admin/offerings` | 取得開課清單 | ADMIN |
| POST | `/api/admin/offerings` | 新增開課 | ADMIN |
| DELETE | `/api/admin/offerings/:id` | 刪除開課 | ADMIN |

### 學生 (Student)

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| GET | `/api/student/offerings` | 查詢當學期可選課程（含剩餘名額） | STUDENT |
| POST | `/api/student/enrollments` | 加選課程 | STUDENT |
| DELETE | `/api/student/enrollments/:offeringId` | 退選課程 | STUDENT |
| GET | `/api/student/schedule` | 取得當學期週課表 | STUDENT |
| GET | `/api/student/grades` | 歷年成績 + GPA | STUDENT |

### 教師 (Teacher)

| Method | Path | 說明 | 權限 |
|--------|------|------|------|
| GET | `/api/teacher/offerings` | 取得本學期個人授課清單 | TEACHER |
| GET | `/api/teacher/offerings/:id/students` | 該門課學生名冊 | TEACHER |
| POST | `/api/teacher/offerings/:id/scores` | 批次登錄/更新成績 | TEACHER |

---

## 核心業務邏輯

### 1. 選課（含衝堂檢查 + 防超賣）

```
加選流程 (enqueueCourse):
1. 開啟 Prisma $transaction
2. SELECT course_offerings WHERE offering_id = ? FOR UPDATE (悲觀鎖)
3. 檢查 enrolled_count < capacity
4. 檢查學生未重複選課 (enrollments WHERE student_id + offering_id + ENROLLED)
5. 時間衝堂檢查：
   - 取得該學生當學期所有 ENROLLED 課程
   - 判斷：day_of_week 相同 AND 新.start < 舊.end AND 新.end > 舊.start
   - 若衝堂，throw error
6. enrolled_count += 1
7. INSERT INTO enrollments (student_id, offering_id, status: ENROLLED)
8. Commit
```

### 2. 退選

```
dropCourse:
1. 開啟 $transaction
2. 找到 enrollment (student_id + offering_id + ENROLLED)
3. 設定 status = DROPPED
4. enrolled_count -= 1 (course_offerings)
5. Commit
```

### 3. 教師批次登錄成績

```
batchUpdateScores:
1. 開啟 $transaction
2. 驗證 offering.teacher_id === currentTeacherId
3. 逐筆 UPDATE enrollments SET score = ? WHERE student_id = ? AND offering_id = ?
4. Commit
```

### 4. GPA 計算

```
取得學生所有有成績 (score IS NOT NULL) 的 ENROLLED / DROPPED 記錄
JOIN course_offerings 取得 credits
GPA = Σ(score_per_4_scale × credits) / Σ(credits)
```

換算：
| 原始分數 | 4.0 制 |
|----------|--------|
| 90-100 | 4.0 |
| 85-89 | 3.7 |
| 80-84 | 3.3 |
| 75-79 | 3.0 |
| 70-74 | 2.7 |
| 65-69 | 2.3 |
| 60-64 | 2.0 |
| < 60 | 0 |

---

## 實作順序（工作拆解）

| 階段 | 工作項目 | 產出 |
|------|----------|------|
| **Phase 1** | 後端基礎建設 | `server/` 專案初始化、Prisma schema + migration、seed 資料、JWT auth |
| **Phase 2** | 後端 API 完成 | Admin CRUD、Student 選課/退選、Teacher 成績登錄、所有 API |
| **Phase 3** | 前端基礎建設 | `client/` 專案初始化、路由、AuthContext、API client |
| **Phase 4** | 前端頁面完成 | 登入頁、Admin 後台、選課頁、週課表、成績頁、成績登錄頁 |
| **Phase 5** | 整合測試 | 前後端串接、種子資料驗證、端對端流程測試 |

---

## 種子資料（Seed Data）

由 `generate_seed.py` 自動產生，執行後輸出 `seed.sql`。

初始化以下測試資料：

| 資料表 | 筆數 | 內容 |
|--------|------|------|
| users | 8 | 1 Admin + 2 Teacher + 5 Student |
| semesters | 3 | 114-1 (active), 113-2, 113-1 |
| courses | 10 | CS / MATH / ENG / PHYS 各類課程 |
| course_offerings | 10 | 114-1 學期各開一班，涵蓋週一至五不同時段 |
| enrollments | 21 | 每個學生隨機選 3~5 門，50% 有成績 |

**測試帳號密碼**：
- `admin` / `admin123`
- `T001` / `pass123`
- `S001`~`S005` / `pass123`

**重新產生**：修改 `generate_seed.py` 後執行 `python generate_seed.py`，會重新產生 `seed.sql`。

> 注意：`seed.sql` 中的 password_hash 為佔位字串，後端啟動時需用 bcrypt 重新 hash 後寫入。

---

## 注意事項

1. **SQLite 與 FOR UPDATE**：SQLite 不支援 `FOR UPDATE`，改用 `BEGIN IMMEDIATE` 事務模式或在 Prisma 層使用 `select ... forUpdate()` (若驅動支援)。MVP 低併發下以 `$transaction` 保證原子性即可。
2. **密碼**：所有密碼使用 bcrypt hash 後存儲，絕不存明文。
3. **JWT Payload**：`{ userId: number, role: Role, username: string }`，有效期 24 小時。
4. **前端路由守衛**：根據 JWT 解析後的 role 決定可進入的頁面，無權限時導回首頁。
