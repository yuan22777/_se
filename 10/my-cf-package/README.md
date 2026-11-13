# my-cf-package

「今天吃什麼？」食譜靈感抽籤機 — 模組化 npm 套件版。

## 專案結構

```
my-cf-package/
├── package.json       <-- 套件設定檔（main 指向 index.js）
├── README.md          <-- 說明文件
├── index.js           <-- 【關鍵】總入口檔案，把 src 裡的功能集中匯出
├── index.html         <-- 網頁版介面（瀏覽器入口）
├── css/               <-- 依功能拆分的樣式
│   ├── base.css       <-- 變數、版面、header/footer
│   ├── wheel.css      <-- 轉盤樣式
│   ├── search.css     <-- 搜尋頁樣式
│   └── modal.css      <-- 食譜彈窗樣式
└── src/               <-- 拆分後的功能模組
    ├── api.js         <-- TheMealDB API（純資料層，可在 Node 使用）
    ├── modal.js       <-- 食譜詳細彈窗
    ├── wheel.js       <-- 轉盤抽籤
    ├── search.js      <-- 食材搜尋
    └── main.js        <-- initApp()：初始化整個應用程式
```

## 模組說明

| 模組 | 匯出內容 |
|---|---|
| `src/api.js` | `fetchMealsByCategory`、`fetchMealsByIngredient`、`fetchRandomMeal`、`fetchMealById`、`parseIngredients` |
| `src/modal.js` | `initModal`、`openRecipeModal`、`closeModal` |
| `src/wheel.js` | `initWheel` |
| `src/search.js` | `initSearch` |
| `src/main.js` | `initApp`（呼叫上面各模組的 init） |

所有需要 DOM 的功能都改成在 `initXxx()` 內才抓元素，因此 `index.js` 在 Node 環境也可以正常 import。

## 使用方式

### 網頁版（瀏覽器）

ES Modules 不能用 `file://` 直接開啟，請用靜態伺服器：

```bash
npx wrangler pages dev .
# 或
npx serve .
```

然後打開 `http://localhost:8788`（或提示的 port）。

### 當作 npm 套件 import

```js
import {
  fetchRandomMeal,
  parseIngredients,
  initApp,
} from "./index.js";
```

## 資料來源

[TheMealDB](https://www.themealdb.com/) · 學習用途
