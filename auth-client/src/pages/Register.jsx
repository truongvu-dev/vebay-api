import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra đơn giản (bạn có thể nâng cấp thêm)
    if (!formData.email || !formData.password || !formData.username) {
      return setMessage("Vui lòng điền đầy đủ thông tin.");
    }

    try {
      const response = await axios.post("http://localhost:3000/api/register", formData); // 👉 đổi URL theo backend của bạn
      setMessage("Đăng ký thành công! 🎉");
      setFormData({ username: "", email: "", password: "" });
      // Hoặc redirect sang /login nếu muốn
      // window.location.href = "/login";
    } catch (err) {
      setMessage(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 400 }}>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={formData.username}
          onChange={handleChange}
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        /><br />
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
    </div>
  );
}
