const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());

// 設定 PostgreSQL 連線
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydb',
  port: 5432,
});

// 自動建立資料表 (若不存在)
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("PostgreSQL Table initialized successfully.");
  } catch (err) {
    console.error("Error initializing DB:", err);
  }
}
initDb();

// 1. 取得系統健康狀態與 DB 時間
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: "Online",
      service: "Node.js (Express)",
      database: "PostgreSQL 15",
      db_time: result.rows[0].now,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. 取得所有留言/紀錄 (READ)
app.get('/api/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM system_logs ORDER BY id DESC LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. 新增紀錄到 PostgreSQL (CREATE)
app.post('/api/logs', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const result = await pool.query(
      'INSERT INTO system_logs (content) VALUES ($1) RETURNING *',
      [content]
    );
    res.json({ success: true, item: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});