// project-root/config/db.js

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// ✅ Tạo hàm async để sử dụng await đúng chuẩn
async function connectDB() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    });

    console.log("✅ Đã kết nối MySQL");
    console.log("🔥 Đang dùng file db.js ở:", import.meta.url);

    return db;
  } catch (error) {
    console.error("❌ Lỗi kết nối DB:", error.message);
    process.exit(1); // Dừng app nếu kết nối DB thất bại
	console.log("🧪 DB_USER:", process.env.DB_USER); // phải ra: 'vebay_user'
    console.log("🧪 DB_PASSWORD:", process.env.DB_PASSWORD); // phải có

  }
}

export default connectDB;
