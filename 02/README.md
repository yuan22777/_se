# 校務行政系統 MVP

依 `plan.md` 實作的前後端分離校務系統：使用者管理、學期/開課管理、線上選課（衝堂+防超賣）、週課表、成績查詢+GPA、教師成績登錄。

## 技術棧

- 後端：Node.js + Express（`server/`，ESM + `node:sqlite`，DB 檔為根目錄 `school.db`）
- 前端：React 19 + TypeScript + Vite + Ant Design 5（`client/`）
- 種子資料：`generate_seed.py` → `seed.sql` → `node scripts/seed.js`

## 快速啟動

```powershell
# 1. 後端（port 3000）
cd 02/server
npm install
node src/index.js
# 健康檢查：http://localhost:3000/api/health

# 2. 前端（port 5173，/api 已 proxy 到 3000）
cd 02/client
npm install
npm run dev
# 開啟 http://localhost:5173
```

## 資料庫重置

```powershell
# 重新產生種子 SQL（需安裝 bcrypt：pip install bcrypt）
python generate_seed.py

# 載入種子資料到 school.db
cd server
npm run seed
```

## 測試帳號

| 帳號 | 密碼 | 角色 |
|------|------|------|
| `admin` | `admin123` | 系統管理員 |
| `T001` / `T002` | `pass123` | 教師 |
| `S001`~`S005` | `pass123` | 學生 |

## 核心 API

- 認證：`POST /api/auth/login`、`POST /api/auth/reset-password`、`GET /api/auth/me`
- 管理員：`GET/POST /api/admin/users`、`POST /api/admin/users/batch-import`、`DELETE /api/admin/users/:id`、`GET/POST /api/admin/semesters`、`PATCH /api/admin/semesters/:id/activate`、`GET/POST/DELETE /api/admin/offerings`、`GET/POST /api/admin/courses`
- 學生：`GET /api/student/offerings`、`POST /api/student/enrollments`、`DELETE /api/student/enrollments/:offeringId`、`GET /api/student/schedule`、`GET /api/student/grades`
- 教師：`GET /api/teacher/offerings`、`GET /api/teacher/offerings/:id/students`、`POST /api/teacher/offerings/:id/scores`

## E2E 測試

### 後端 API E2E（`server/tests/`，Node 內建 test runner，零新依賴）

```powershell
cd 02/server
npm test   # node --test --test-concurrency=1 "tests/*.e2e.test.js"
```

- 5 檔 39 測：`auth`（登入/權杖/角色守衛/密碼重設）、`seed`（種子資料驗證）、`admin`（使用者/批次匯入/學期/開課 CRUD）、`student`（加退選/衝堂/防超賣/GPA）、`teacher`（名冊/成績登錄/越權阻擋）。
- 每檔開始前自動重建種子資料、結束後還原 `school.db`，起點一致可重複跑。
- 直接載入 Express app 打隨機 port，不佔用 dev 的 3000；中文路徑下請用 glob 寫法（已設好）。

### 前端 UI E2E（`client/e2e/`，Playwright + Chromium）

```powershell
cd 02/client
npx playwright install chromium   # 僅首次
npm run test:e2e
```

- `global-setup` 先重建種子資料；webServer 自動起後端 :3100 + 前端 :5174，跑完自動關閉。
- 前端經 `VITE_API_URL` 直連 :3100（避開 vite dev proxy 偶發卡住）；`workers: 1` 循序跑（學期切換是全域狀態）。
- 16 測：登入/錯誤訊息/角色導向/登出、儀表板統計、使用者新增刪除、學期新增切換、選課加退選、課表成績頁、授課清單、成績登錄送出。

### 加測試時附帶修的 bug

- 全站 `message.success/error`（antd 靜態 API）在 React 19 下無聲失效：POST 成功、UI 也更新，但 toast 永不出現。已改用 `App.useApp()` contextual message（`App.tsx` 包 `<AntdApp>`，7 個頁面置換），並升級 antd 到 5.29。

## 業務規則

- 加選：只能選當學期（`is_active=1`）、`enrolled_count < capacity` 原子檢查、不可重複選、同一 `day_of_week` 且時間重疊即衝堂擋下，全程 `BEGIN IMMEDIATE` 交易。
- 退選：`ENROLLED → DROPPED` + `enrolled_count - 1`。
- 成績：僅授課教師可批次更新，0~100；GPA 採 4.0 加權（90→4.0、85→3.7、80→3.3、75→3.0、70→2.7、65→2.3、60→2.0、<60→0）。
