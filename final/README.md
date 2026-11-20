# 資工專業辭典 CS Dictionary — 純靜態版

## 使用方式
直接**雙擊 `static/index.html`** 即可開啟，不需要安裝套件、不需要啟動伺服器、不需要資料庫或爬蟲。

若要部署到任何靜態空間（GitHub Pages、Netlify、nginx 等），把 `static/` 整個資料夾上傳即可。

## 功能
1. ✅ 中英詞彙庫：`terms.js` 共 112 筆（原有 57 筆 + 參考「計算機科學專有名詞中英文對照表」新增 55 筆：Algorithm、Array、Abstraction、CAP Theorem、CRUD、Data Structure、Idempotency、JSON、OSI Model、Paxos、Raft、Stack、Unicode、Zero-day Attack…）
2. ✅ 搜尋欄：debounce 300ms + 即時下拉建議，中/英/全名/定義/情境全文可搜
3. ✅ 分類 + 情境：分類 pills 與熱門情境 tags，點標籤直接篩選
4. ✅ 拼字容錯：前端 Levenshtein + SequenceMatcher，打 `RAGg`、`Recusion`、`Polymorphsim` 會顯示「你是不是要找…？」
5. ✅ 學習地圖：`learning_paths.js` 定義 6 門課程與 4 種職涯角色，支援年級/課程篩選、考前衝刺、面試頻率分級、場景過濾與複習進度（進度存於瀏覽器 localStorage）
6. ✅ 溝通與實務專區：業界口頭禪 Badge、實務對話、面試一句話解釋（一鍵複製）與觀念對比表
7. ✅ 匯出：課程詳情頁可匯出 Anki CSV 與 PDF 考前快查表

新增詞彙的名稱與中文對照參考自 [計算機科學專有名詞 - 中英文對照表](https://rickhw.github.io/2017/07/01/Reference/SC-Terms/)，定義、例句與溝通實務欄位為本專案自行撰寫。

## 檔案結構
```
final/
  static/
    index.html          主頁面（所有搜尋、學習地圖、詳細頁邏輯都在本檔）
    terms.js            112 筆詞彙資料
    learning_paths.js   6 門課程 + 4 個職涯角色定義
    preview.html        簡易版（僅辭典搜尋，雙擊即開）
  terms.json             詞彙原始資料（供重新產生 terms.js）
  learning_paths.json    學習地圖原始資料（供重新產生 learning_paths.js）
  app.py / requirements.txt  舊版 FastAPI 後端，已不再需要，可刪除
  plan.md / 對話紀錄.md      專案文件
```

## 資料更新
直接編輯 `terms.json` / `learning_paths.json`，再同步到對應的 `terms.js`（`const TERMS = [...]`）與
`learning_paths.js`（`const PATHS = {...}`）即可；頁面本身完全不依賴任何 API。
