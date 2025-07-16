import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import connectDB from "./project-root/config/db.js";

dotenv.config({ path: "./.env.local" }); // ✅ đọc .env.local hoặc .env.production

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Đọc file tĩnh: HTML, CSS, JS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// 👉 Gắn router có middleware xác thực JWT
app.use("/api", userRoutes);

// ✅ Tạo hàm khởi động an toàn
const startServer = async () => {
  try {
    await connectDB(); // kết nối MySQL
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Lỗi kết nối DB:", error.message);
    // 👉 Server không bị crash — app vẫn chạy cho frontend hiển thị được
  }
};

startServer();
