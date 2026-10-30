# 資工專業辭典 CS Dictionary — MVP（對應 03/plan.md）

## 啟動方式
```powershell
cd 03
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```
開啟 http://127.0.0.1:8000 （首頁即網站，API 文件在 /docs）

## 對應 plan.md 的功能
1. ✅ 中英詞彙庫：`terms.json` 共 57 筆（RAG、Deadlock、Polymorphism、CI/CD、CORS、ACID、DOM、Vector DB、Deploy、Pull Request…），欄位含 word_en / word_zh / full_name / definition / category / application_scenarios / example_sentence
2. ✅ 搜尋欄：首頁大搜尋欄 + debounce 300ms + 即時 dropdown（`GET /api/search?q=`），中/英/全名/定義/情境全文可搜
3. ✅ 分類 + 情境：分類 pills（`GET /api/categories`）+ 熱門情境 tags（`GET /api/scenarios`），點標籤直接篩選；搜「客服機器人」會找到 RAG / LLM / Chatbot
4. ✅ 拼字容錯：`app.py` 內 Levenshtein + SequenceMatcher（取代 pg_trgm 的 Python 版，未來可換 PostgreSQL pg_trgm），打 `RAGg`、`Recusion`、`Polymorphsim` 會顯示「你是不是要找…？」；純模糊 API 為 `GET /api/suggest?q=`
5. ✅ 學習地圖：`learning_paths.json` 定義 6 門課程（程式設計、離散、OS、網概、DB、演算法）與 4 種職涯角色（前端、後端、DevOps、AI/資料），支援年級/課程篩選、考前衝刺、面試頻率分級、場景過濾與複習進度
6. ✅ 溝通與實務專區：單字詳細頁包含業界口頭禪 Badge、實務對話、面試一句話解釋（一鍵複製）與觀念對比表
7. ✅ 匯出：課程詳情頁可匯出 Anki CSV 與 PDF 考前快查表

## 檔案結構
```
03/
  plan.md        專案規劃
  app.py         FastAPI 後端（模糊搜尋 + 學習地圖 API）
  terms.json     57 筆種子資料（含溝通實務欄位）
  learning_paths.json  課程與職涯角色定義
  static/index.html  前端（辭典搜尋 + 學習地圖 + 詳細 modal）
  static/preview.html / terms.js  免後端預覽版（基本搜尋）
  requirements.txt
```

## API 速覽
- `GET /api/terms?q=&category=&scenario=` 列表/篩選
- `GET /api/terms/{id}` 詳細（含 related、frequency、communication）
- `GET /api/search?q=` 精確+模糊（dropdown 用）
- `GET /api/suggest?q=` 純模糊 top5
- `GET /api/categories` / `GET /api/scenarios`
- `GET /api/learning-paths` 課程與職涯角色列表
- `GET /api/courses/{id}` 課程詳情（含術語清單、must_ids）
- `GET /api/roles/{id}` 職涯角色詳情（含頻率與面試情境）

## 未來升級（plan.md §11）
換成 PostgreSQL + pg_trgm（`similarity(word_en, q)`），前端拆成 Next.js，加上投稿/收藏/ pgvector 語意搜尋。
