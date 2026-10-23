# 多人線上待辦與專案看板（Kanban）

以 React + Express + SQLite 實作的多人協作看板，並包含 **單元測試、Web API 系統測試、E2E 測試** 三層測試。

## 技術棧

| 層級 | 技術 |
| --- | --- |
| 前端 | React 19、React Router、Vite、Tailwind CSS 4、dnd-kit（拖曳） |
| 後端 | Node.js 24、Express 5、JWT、bcryptjs |
| 資料庫 | SQLite（使用 Node 24 內建 `node:sqlite`，測試環境使用 in-memory DB） |
| 單元／API 測試 | Vitest + Supertest |
| E2E 測試 | Playwright（Chromium） |

> `node:sqlite` 在 Node.js 24 仍會顯示 ExperimentalWarning，這是預期行為，不影響功能與測試。

## 快速開始

```bash
npm install

# 開發模式（後端 :3001 + Vite :5173）
npm run dev

# 建置前端並以正式模式啟動（http://127.0.0.1:3001）
npm run build
npm start
```

E2E 首次執行前需安裝瀏覽器：

```bash
npx playwright install chromium
```

## 測試指令

```bash
npm run test:unit   # 單元測試（15 個案例）
npm run test:api    # Web API 系統／整合測試（5 個案例）
npm run test:e2e    # 建置 + 重置測試 DB + Playwright E2E（2 個案例）
npm test            # 單元 + API
npm run test:all    # 三層測試全部執行
```

測試資料隔離方式：

- 單元測試：純函式，不接觸資料庫或網路。
- API 測試：每個測試檔建立獨立的 `:memory:` SQLite 資料庫。
- E2E 測試：每次執行前刪除 `data/e2e.db`，由 Playwright `webServer` 啟動獨立伺服器（port `4173`）。

## 三層測試內容

### 1. 單元測試 `tests/unit/cards.test.js`

測試 `shared/cards.js` 的純商業邏輯（前後端共用）：

- `sortCardsByPriority()`：高 → 中 → 低排序，同優先級依 `position`，且不修改原始陣列。
- `isOverdue()`：昨天 `true`、明天 `false`、空值 `false`、無效日期拋出 `TypeError`。
- `validateCardInput()`：空白標題、超過 100 字、非法優先級、非法日期格式。
- `validateBoardName()`：看板名稱邊界驗證。
- `moveCard()`：同欄位排序、跨欄位移動、索引夾制、找不到卡片時拋錯。

### 2. Web API 系統測試 `tests/api/api.test.js`

以 Supertest 直接呼叫 Express App，並查詢 SQLite 驗證資料確實寫入：

- `POST /api/boards` 附 JWT → `201`，DB 新增看板、擁有者成員與三個預設列表。
- 未帶 JWT 建立看板 → `401`。
- 使用者 A 刪除使用者 B 的卡片 → `403`，且卡片仍存在於 DB（權限控管）。
- `PATCH /api/cards/:id` 將卡片從 To Do 移到 Done → DB `status` 變成 `done`、`updated_at` 確實更新。
- 受邀協作者可新增卡片但不可邀請成員；非成員存取看板 → `403`。

### 3. E2E 測試 `tests/e2e/app.spec.js`

以 Playwright 模擬真實瀏覽器操作：

- **Happy Path**：註冊（API）→ 登入頁登入 → 建立看板 → 新增卡片「完成 E2E 測試」→ 拖曳到 Done → 重新整理頁面後卡片仍在 Done。
- **異常操作**：空白卡片標題點擊「建立」→ 顯示紅色（`bg-red-600`）Toast，且攔截確認沒有任何 `POST /api/lists/:id/cards` 請求。

## 功能模組

- **使用者與權限**：註冊、登入、JWT（7 天）、看板擁有者／協作者權限、Email 邀請成員。
- **看板與列表**：建立看板（自動產生 To Do / In Progress / Done）、新增列表、成員管理。
- **任務卡片**：CRUD、優先級（高／中／低）、截止日期、逾期紅框提示、拖曳跨欄與同欄排序。
- **狀態與排序**：拖曳後更新 `list_id`、`position`、`status`、`updated_at`，重新整理仍保留。

## API 一覽

| 方法 | 路徑 | 說明 |
| --- | --- | --- |
| POST | `/api/auth/register` | 註冊並取得 JWT |
| POST | `/api/auth/login` | 登入並取得 JWT |
| GET | `/api/auth/me` | 取得目前使用者 |
| GET | `/api/boards` | 列出可存取的看板 |
| POST | `/api/boards` | 建立看板（含預設列表） |
| GET | `/api/boards/:id` | 看板詳情（列表、卡片、成員） |
| PATCH / DELETE | `/api/boards/:id` | 修改／刪除看板（僅擁有者） |
| POST | `/api/boards/:id/lists` | 新增列表 |
| POST | `/api/boards/:id/members` | 邀請成員（僅擁有者） |
| DELETE | `/api/boards/:id/members/:userId` | 移除成員（僅擁有者） |
| POST | `/api/lists/:id/cards` | 新增卡片 |
| GET | `/api/lists/:id/cards` | 取得列表卡片 |
| PATCH / DELETE | `/api/lists/:id` | 修改／刪除列表 |
| PATCH | `/api/cards/:id` | 編輯卡片、跨欄移動與排序 |
| DELETE | `/api/cards/:id` | 刪除卡片 |

## 專案結構

```text
07/
├─ client/                 React 前端
│  ├─ src/
│  │  ├─ components/       Toast、Modal、Column、CardModal
│  │  ├─ pages/            AuthPage、BoardsPage、BoardPage
│  │  ├─ api.js            前端 API client（自動附加 JWT）
│  │  └─ auth.jsx          登入狀態 Context
│  └─ index.html
├─ server/src/
│  ├─ app.js               Express App 工廠（方便測試注入 in-memory DB）
│  ├─ db.js                SQLite schema 與交易工具
│  ├─ auth.js              bcrypt / JWT / requireAuth
│  ├─ repos.js             資料查詢與看板聚合
│  └─ routes/              auth、boards、lists、cards
├─ shared/cards.js         前後端共用純商業邏輯（單元測試目標）
├─ tests/
│  ├─ unit/                單元測試
│  ├─ api/                 Supertest API 測試
│  └─ e2e/                 Playwright E2E 測試與 DB 重置腳本
├─ vite.config.js
├─ vitest.config.js
└─ playwright.config.js
```
