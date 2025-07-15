import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPasswordConfirm() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("⚠️ Vui lòng nhập mật khẩu mới.");

    try {
      await axios.post("/api/reset-password", { token, password });
      toast.success("✅ Mật khẩu đã được cập nhật!");
      navigate("/reset-password-success");
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("⛔ Token hết hạn hoặc không hợp lệ.");
      } else if (err.response?.status === 404) {
        toast.error("❌ Tài khoản không tồn tại.");
      } else {
        toast.error("🚨 Lỗi hệ thống, thử lại sau!");
      }
    }
  };

  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h2>🔐 Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <br /><br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}
