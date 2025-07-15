import db from "../project-root/config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Vui lòng nhập email." });

  try {
    const [results] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (results.length === 0)
      return res.status(404).json({ message: "Không tìm thấy người dùng." });

    const user = results[0];
    if (!user.is_verified)
      return res.status(403).json({ message: "Tài khoản chưa xác minh." });

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "15m" });
    const resetLink = `${process.env.BASE_URL}/reset-password-confirm.html?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Xác thực" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "🔐 Khôi phục mật khẩu",
      html: `
        <p>Xin chào <b>${user.username}</b>,</p>
        <p>Click vào liên kết để đặt lại mật khẩu (hiệu lực 15 phút):</p>
        <a href="${resetLink}">${resetLink}</a>
        <p style="color: gray; font-size: 0.9em;">Bỏ qua nếu bạn không thực hiện yêu cầu này.</p>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Lỗi gửi mail:", err);
        return res.status(500).json({ message: "Không gửi được email." });
      }
      console.log(`📨 Đã gửi mail reset tới ${user.email}`);
      res.status(200).json({ message: "📧 Liên kết khôi phục đã được gửi đến email!" });
    });
  } catch (err) {
    console.error("🔥 Lỗi forgotPassword:", err);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ message: "Thiếu token hoặc mật khẩu." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [decoded.email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy người dùng." });

    const user = rows[0];
    if (!user.is_verified)
      return res.status(403).json({ message: "Tài khoản chưa xác minh." });

    const hashed = await bcrypt.hash(password, 10);
    await db.query(`UPDATE users SET password = ? WHERE email = ?`, [hashed, decoded.email]);
    res.json({ message: "✅ Mật khẩu đã được cập nhật thành công." });
  } catch (err) {
    console.error("⛔ Token lỗi hoặc hết hạn:", err);
    res.status(403).json({ message: "Liên kết không hợp lệ hoặc đã hết hạn." });
  }
};
