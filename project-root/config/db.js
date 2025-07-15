import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // ✅ trùng tên biến thật
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

console.log("✅ Đã kết nối MySQL");
console.log("🔥 Đang dùng file db.js ở:", import.meta.url);

export default db;
