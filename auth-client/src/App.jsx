import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import GuestBooking from "./pages/GuestBooking";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import { Toaster } from "react-hot-toast";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";

<Route path="/forgot-password" element={<ForgotPassword />} />


export default function App() {
  console.log("✅ App.jsx đang chạy chính xác!");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/booking" element={<GuestBooking />} />
        <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
        <Route path="/reset-password-confirm" element={<ResetPasswordConfirm />} />
      </Routes>
      {/* ✅ Toaster nằm ngoài để toàn bộ app dùng được */}
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}
