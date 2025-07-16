ECHO is on.
# vebay-api ✈️

Hệ thống backend đặt vé máy bay, bảo mật bằng JWT và Socket.IO  
Xây dựng với Node.js + Express + MySQL

## 🔐 Bảo mật bằng JWT

Mã hoá token người dùng bằng khóa bí mật: `JWT_SECRET=token_bi_mat_vebay`
Backend API cho hệ thống đặt vé máy bay và quản lý tài khoản người dùng.  
Xây dựng bằng Node.js, Express, Socket.io, và kết nối MySQL.  
Triển khai qua GitHub + VPS, bảo mật bằng JWT, live socket, và quản lý quyền truy cập chuẩn Dev thần tốc.

## 📦 Cấu trúc dự án

- `/controllers` — Xử lý logic từng route
- `/models` — Giao tiếp với database
- `/routes` — Điểm vào API cho client
- `/middlewares` — Xác thực & xử lý token
- `/public` — Trang web tĩnh hỗ trợ đăng nhập / đăng ký
- `/auth-client` — Frontend bằng Vite + React (SPA)
- `server.js` — Cổng khởi động backend thần tốc

## 🚀 Triển khai

```bash
npm install
npm run dev