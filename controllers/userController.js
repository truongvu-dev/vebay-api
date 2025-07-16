import db from "../project-root/config/db.js"; // ✅ tương tự
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../utils/mailer.js";
import jwt from "jsonwebtoken";

// 🔐 Đăng nhập
export const login = async (req, res) => {
  const { identity, password } = req.body;

  if (!identity || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  try {
    const [results] = await db.query(
      `SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?`,
      [identity, identity, identity]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Không tìm thấy tài khoản." });
    }

    const user = results[0];
    console.log("📥 Dữ liệu người dùng:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🧪 Kết quả so sánh mật khẩu:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu." });
    }

    if (!user.is_verified) {
      return res.status(403).json({ message: "Tài khoản chưa xác minh." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: `🎉 Xin chào ${user.username || "bạn"}!`,
      token,
    });

  } catch (err) {
    console.error("🔥 Lỗi trong login():", err);
    return res.status(500).json({ message: "Lỗi máy chủ." });
  }
};


// 👤 Xem thông tin người dùng từ token
export const getProfile = async (req, res) => {
  const { identity } = req.user;

  try {
    const [rows] = await db.query(
      `SELECT id, username, email, phone, role FROM users WHERE username = ? OR email = ? OR phone = ? LIMIT 1`,
      [identity, identity, identity]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy người dùng." });

    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Lỗi truy vấn CSDL." });
  }
};

// 🛠️ Cập nhật thông tin hồ sơ
export const updateProfile = async (req, res) => {
  const { identity } = req.user;
  const { username, email, phone } = req.body;

  if (!username || !email || !phone)
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });

  try {
    await db.query(
      `UPDATE users SET username = ?, email = ?, phone = ? WHERE username = ? OR email = ? OR phone = ?`,
      [username, email, phone, identity, identity, identity]
    );
    res.json({ message: "✅ Cập nhật thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật hồ sơ." });
  }
};

// 🔒 Đổi mật khẩu
export const changePassword = async (req, res) => {
  const { identity } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: "Vui lòng nhập đủ thông tin." });

  try {
    const [results] = await db.query(
      `SELECT * FROM users WHERE username = ? OR email = ? OR phone = ? LIMIT 1`,
      [identity, identity, identity]
    );

    if (results.length === 0)
      return res.status(404).json({ message: "Không tìm thấy người dùng." });

    const user = results[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mật khẩu hiện tại không đúng." });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query(`UPDATE users SET password = ? WHERE id = ?`, [hashed, user.id]);

    res.json({ message: "🔐 Mật khẩu đã được cập nhật." });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
  return res.redirect("/reset-password-success.html");

};

export const register = async (req, res) => {
  const { name, username, email, phone, password } = req.body;

  if (!name || !username || !email || !phone || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  try {
    const [existing] = await db.query(`SELECT id FROM users WHERE username = ? OR email = ?`, [username, email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Tên tài khoản hoặc email đã tồn tại." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToken = uuidv4();

    await db.query(
      `INSERT INTO users (name, username, email, phone, password, email_token, is_verified, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 0, NOW())`,
      [name, username, email, phone, hashedPassword, emailToken]
    );

    await sendVerificationEmail(email, emailToken);

    res.status(201).json({ message: "🎉 Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản." });
  } catch (err) {
    console.error("🔴 Đăng ký lỗi:", err);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).send("Thiếu token xác minh.");

  try {
    const [rows] = await db.query(`SELECT id FROM users WHERE email_token = ?`, [token]);
    if (rows.length === 0) return res.status(400).send("Token không hợp lệ hoặc đã hết hạn.");

    await db.query(`UPDATE users SET is_verified = 1, email_token = NULL WHERE id = ?`, [rows[0].id]);

    // ✅ Chuyển về trang login sau khi xác minh
    res.redirect("http://localhost:5173/login?verified=true");
  } catch (err) {
    console.error("Xác minh lỗi:", err);
    res.status(500).send("Lỗi máy chủ.");
    console.log("🛎️ Nhận quên mật khẩu cho:", email);
    console.log("🎯 Kết quả DB:", results);
    console.log("📨 Gửi mail với token:", token);

  }
};
