# 資工專業辭典 — MVP 專案規劃

> 位置：`03/plan.md`
> 目標：為資工系大學生、初入職場新人打造「上課聽得懂、實務對得上」的專業辭典

## 1. 專案背景與動機

### 1.1 痛點
- 上課老師常直接講英文術語（如 Deadlock, Polymorphism, Latency, RAG），學生聽到但不懂意思。
- 即使查到中文翻譯，仍不知道「什麼情況下會用到」。
- 現有字典（Google 翻譯、Wikipedia）太發散，沒有資工情境分類，也沒有容錯搜尋。

### 1.2 目標使用者
1. 資工系大學生（大一～大四）：上課、考試、做專題查詞。
2. 初入職場新人（0-2年）：面試、看技術文件、跟前輩溝通。

### 1.3 MVP 成功定義
- 使用者能在 3 秒內搜到想查的詞，即使英文拼錯 1-2 個字母。
- 每個詞都有：中英對照 + 白話定義 + 分類 + 使用情境標籤。
- 搜尋「情境關鍵字」（如「客服機器人」）也能找到對應技術詞（如 RAG）。

## 2. MVP 功能範圍（Scope）

### 必須做（P0）
1. **中英詞彙庫**：收錄 50-100 個資工常見詞，涵蓋 OS / 網路 / AI / 軟工 / 資料庫。
   - 欄位：英文、中文、全名、白話定義、例句。
2. **搜尋欄**：支援中、英文、全名、定義全文搜尋，即時 dropdown。
3. **分類 + 使用情境標籤**：
   - `category`：大分類，如 人工智慧、作業系統、計算機網路、軟體工程。
   - `application_scenarios`：使用情境，如 RAG → `企業內部知識庫、文件問答、客服機器人、技術文件助手、AI搜尋引擎`。
   - 支援點標籤篩選、搜情境找技術。
4. **拼字容錯推薦**：英文打錯時，下方顯示「你是不是要找…？」前 3-5 個最相關單字。

### 暫不做（P1 / 未來）
- 會員登入、收藏、筆記
- AI 語意搜尋 / 向量搜尋
- 使用者投稿、審核機制
- 深色模式、多語系

## 3. 系統架構與技術選型

```
[ Browser / Mobile ]
        |
        v
[ Frontend: Next.js + Tailwind ] --REST--> [ Backend: FastAPI ]
                                                  |
                                                  v
                                          [ DB: PostgreSQL + pg_trgm ]
```

| 層級 | 建議 Stack | 選用理由 |
|---|---|---|
| 前端 Frontend | Next.js (React) + Tailwind CSS | 開發快、SEO 友善、搜尋體驗好，Vercel 一鍵部署 |
| 後端 Backend | Python FastAPI | 處理模糊搜尋（Levenshtein / difflib / pg_trgm）與文字處理方便，自動生成 OpenAPI 文件 |
| 資料庫 Database | PostgreSQL + pg_trgm | 原生支援 `% word %` 相似度、`similarity()` 排序、全文字檢索，MVP 不需另架 ES；未來可加 pgvector 做語意搜尋 |
| 部署 Deployment | Vercel（前端）+ Render / Railway（後端）+ Neon / Supabase（DB） | 免費額度夠 MVP 展示，CI/CD 簡單 |
| 備選 | 前端 React Vite / 後端 Node Express / DB MongoDB | 若團隊只會 JS 可全 JS 化，但模糊搜尋需自刻 |

> MVP 原則：前後端分離，但先用單一 Repo（monorepo）+ REST JSON 溝通，保持技術單純。

## 4. 資料結構設計（Data Schema）

核心表：`terms`

```json
{
  "id": "term_001",
  "word_en": "RAG",
  "word_zh": "檢索增強生成",
  "full_name": "Retrieval-Augmented Generation",
  "definition": "結合檢索系統與大語言模型的技術，讓 AI 能參考外部知識庫來回答問題，降低幻覺。",
  "category": ["人工智慧", "自然語言處理"],
  "application_scenarios": [
    "企業內部知識庫",
    "文件問答",
    "客服機器人",
    "技術文件助手",
    "AI搜尋引擎"
  ],
  "example_sentence": "這家公司想做內部資料庫問答，建議使用 RAG 架構來降低 AI 幻覺。",
  "related_terms": ["term_002", "term_003"],
  "created_at": "2026-09-24T00:00:00Z"
}
```

SQL 概念設計：
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE TABLE terms (
  id TEXT PRIMARY KEY,
  word_en TEXT NOT NULL,
  word_zh TEXT NOT NULL,
  full_name TEXT,
  definition TEXT NOT NULL,
  category TEXT[] NOT NULL,
  application_scenarios TEXT[] NOT NULL,
  example_sentence TEXT,
  related_terms TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_terms_en_trgm ON terms USING gin (word_en gin_trgm_ops);
CREATE INDEX idx_terms_zh_gin ON terms USING gin (to_tsvector('simple', word_zh || ' ' || definition));
```

首批種子資料（50-100詞範例）：
`RAG, Deadlock, Polymorphism, CI/CD, Latency, Throughput, Recursion, API, SDK, ORM, Index, Transaction, Normalization, TCP/UDP, DNS, HTTP, REST, WebSocket, Process, Thread, Mutex, Semaphore, Virtual Memory, Cache, Load Balancer, Docker, Kubernetes, Git, Agile, LLM, Embedding...`

## 5. 關鍵功能實作規劃

### 5.1 搜尋欄 + 即時建議
- 前端：input `onChange` + Debounce 300ms，`fetch /api/search?q=`，dropdown 顯示。
- 後端搜尋優先順序：
  1. 完全比對 `word_en` / `word_zh`
  2. 前綴比對 `ILIKE 'q%'`
  3. 情境/分類比對 `application_scenarios @> / category`
  4. 模糊比對（容錯）
- 回傳格式：`{ exact: [...], suggestions: [...], scenario_hits: [...] }`

### 5.2 拼字容錯（Fuzzy Search）
需求：輸入 `RAGg`、`Recusion` 也要能推薦正確單字。

後端二選一（MVP 建議先做 A）：
- **A. PostgreSQL pg_trgm（推薦）**：`SELECT *, similarity(word_en, 'Recusion') AS sim ORDER BY sim DESC LIMIT 5`，門檻 `sim > 0.3`。
- **B. Python Levenshtein**：`rapidfuzz` / `difflib.get_close_matches`，適合詞量 < 500 且不想裝 extension 時。

前端顯示：「你是不是要找：Recursion（遞迴）？」+ 3-5 個卡片。

### 5.3 分類與情境導覽
- 首頁分類篩選區：作業系統、網路、人工智慧、軟體工程、資料庫。
- 每個詞詳細頁用 Card 顯示 Tags，點擊 Tag 跳轉到該 Tag 搜尋結果頁（`/tag/客服機器人`）。
- 搜「客服機器人」→ 同時命中 `application_scenarios` 含該詞的 RAG、Chatbot、LLM 等。

## 6. API 設計（MVP 最小集）

```
GET  /api/terms?q=rag&category=人工智慧&scenario=客服機器人&limit=10
GET  /api/terms/:id            # 單字詳細
GET  /api/search?q=recusion    # 整合精確+模糊，給 dropdown 用
GET  /api/suggest?q=RAGg       # 純模糊推薦 top 5
GET  /api/categories           # 所有分類列表
GET  /api/scenarios            # 熱門情境標籤列表
POST /api/terms                # MVP 管理用新增（先不做權限，後期加）
```

`GET /api/search?q=` 回應範例：
```json
{
  "query": "RAGg",
  "exact": [],
  "suggestions": [
    { "id": "term_001", "word_en": "RAG", "word_zh": "檢索增強生成", "score": 0.86 }
  ]
}
```

## 7. 前端頁面規劃（3 頁即可）

1. **首頁 `/`**：大搜尋欄 + 分類 pills + 熱門情境 tags + 熱門單字卡片（6-8 張）。
2. **搜尋結果頁 `/search?q=`**：左側分類篩選，右側結果卡片列表，拼錯時頂部黃條提示。
3. **單字詳細頁 `/term/:id`**：中英、全名、定義、分類、情境 tags、例句、相關詞彙（3-5 個）。

UI 規範：Tailwind，卡片式、手機優先（max-w-3xl 置中），搜尋欄置頂 sticky。

## 8. MVP 開發時程（4 週計畫）

| 週次 | 任務 | 交付物 | 驗收 |
|---|---|---|---|
| W1 資料與規範 | 定 Schema、整理 50-100 詞成 `seed.json`、定 API spec | `schema.sql`、`seed.json`、OpenAPI | 100 詞每筆都有分類+≥3 情境 |
| W2 後端 | FastAPI + Postgres + pg_trgm，實作 6 支 API + 模糊搜尋 | 可跑的 `/api/search`、`/api/suggest` | 打錯 2 字母內能回正確前 3 名 |
| W3 前端 | Next.js 3 頁 + 搜尋 debounce + tag 篩選串接 | 可操作的 demo 網站（local） | 搜中/英/情境皆有結果，手機版不跑版 |
| W4 部署測試 | 部署 Vercel+Render，找 10 位同學測試 | 公開 URL + 回饋表 | 搜尋成功率 >90%、收集 ≥20 條補詞需求 |

## 9. 驗收標準與測試

- 功能測試：精確搜尋、中英搜尋、情境搜尋、拼錯推薦、分類篩選各 10 組 case。
- 效能：100 詞規模下 `/api/search` p95 < 200ms。
- 相容：Chrome / Safari / 手機版。

## 10. 風險與對策

- 詞庫品質不一 → 先定寫作模板（定義 ≤80 字 + 1 例句 + ≥3 情境），一人審稿。
- 模糊搜尋太鬆/太嚴 → pg_trgm 門檻可調（0.3-0.5），上線後看 log 調。
- 範圍膨脹 → 嚴守 P0，會員/AI語意一律放 P1。

## 11. 下一步（做完 MVP 後）

1. 使用者投稿 + 審核
2. pgvector 語意搜尋（「面試常考 OS 題」也能找到 Deadlock）
3. 收藏 / 單字本 / 測驗模式
