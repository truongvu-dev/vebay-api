import express from "express";
import {
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  verifyEmail
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyEmail);
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);
router.put("/change-password", authenticateToken, changePassword);

// 🔐 Định tuyến cho quên & đặt lại mật khẩu
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
