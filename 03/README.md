# 資工專業辭典 CS Dictionary — MVP（對應 03/plan.md）

## 啟動方式
```powershell
cd 03
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```
開啟 http://127.0.0.1:8000 （首頁即網站，API 文件在 /docs）

## 對應 plan.md 的功能
1. ✅ 中英詞彙庫：`terms.json` 共 40 筆（RAG、Deadlock、Polymorphism、CI/CD、Latency…），欄位含 word_en / word_zh / full_name / definition / category / application_scenarios / example_sentence
2. ✅ 搜尋欄：首頁大搜尋欄 + debounce 300ms + 即時 dropdown（`GET /api/search?q=`），中/英/全名/定義/情境全文可搜
3. ✅ 分類 + 情境：分類 pills（`GET /api/categories`）+ 熱門情境 tags（`GET /api/scenarios`），點標籤直接篩選；搜「客服機器人」會找到 RAG / LLM / Chatbot
4. ✅ 拼字容錯：`app.py` 內 Levenshtein + SequenceMatcher（取代 pg_trgm 的 Python 版，未來可換 PostgreSQL pg_trgm），打 `RAGg`、`Recusion`、`Polymorphsim` 會顯示「你是不是要找…？」；純模糊 API 為 `GET /api/suggest?q=`

## 檔案結構
```
03/
  plan.md        專案規劃
  app.py         FastAPI 後端（6 支 API + 模糊搜尋）
  terms.json     40 筆種子資料
  static/index.html  前端（搜尋首頁+結果+詳細 modal 三合一）
  requirements.txt
```

## API 速覽
- `GET /api/terms?q=&category=&scenario=` 列表/篩選
- `GET /api/terms/{id}` 詳細（含 related）
- `GET /api/search?q=` 精確+模糊（dropdown 用）
- `GET /api/suggest?q=` 純模糊 top5
- `GET /api/categories` / `GET /api/scenarios`

## 未來升級（plan.md §11）
換成 PostgreSQL + pg_trgm（`similarity(word_en, q)`），前端拆成 Next.js，加上投稿/收藏/ pgvector 語意搜尋。
