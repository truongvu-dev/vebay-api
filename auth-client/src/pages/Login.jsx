import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromURL = searchParams.get("token");

  useEffect(() => {
    if (tokenFromURL) {
      login(tokenFromURL); // Lưu token vào context
      navigate("/dashboard"); // Chuyển hướng
    }
  }, [tokenFromURL]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Vui lòng điền đủ email và mật khẩu.");
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/login", formData);
      login(res.data.token);
      toast.success("Đăng nhập thành công! 🔓");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-box">
        <h2>🎟️ Đăng nhập hệ thống</h2>
        <p>Tiếp tục đặt vé và quản lý tài khoản của bạn</p>
        <form>
          <input type="text" placeholder="Tên đăng nhập hoặc email" />
          <input type="password" placeholder="Mật khẩu" />
          <button type="submit">Đăng nhập</button>
        </form>
        <p className="forgot" onClick={() => navigate("/forgot-password")}>🔁 Quên mật khẩu?</p>
      </div>
      
    </div>
  );
}
