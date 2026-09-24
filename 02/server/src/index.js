import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[OK] 校務行政系統後端已啟動: http://localhost:${PORT}`);
  console.log(`     健康檢查: http://localhost:${PORT}/api/health`);
});