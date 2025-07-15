import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      toast.success("📧 Đã gửi liên kết khôi phục đến email!");
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("⚠️ Tài khoản chưa xác minh. Vui lòng xác minh trước.");
      } else if (err.response?.status === 404) {
        toast.error("❌ Email chưa đăng ký.");
      } else {
        toast.error("🚨 Gửi mail thất bại.");
      }
    }
  };

  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h2>🔁 Quên mật khẩu</h2>
      <p>Vui lòng nhập email để nhận liên kết đặt lại mật khẩu.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <br /><br />
        <button type="submit" style={{ padding: "10px 20px" }}>Gửi liên kết</button>
      </form>
    </div>
  );
}
