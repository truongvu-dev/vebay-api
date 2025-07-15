// test-send-mail.js
import transporter from "./utils/transporter.js";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Tester 👨‍💻" <${process.env.MAIL_USER}>`,
      to: "diachi.email.cua.ban@gmail.com", // 🔁 sửa thành địa chỉ bạn muốn test
      subject: "🛠️ Test gửi mail thành công!",
      html: `
        <h2>Xin chào từ hệ thống!</h2>
        <p>Đây là email test từ chiến hữu Copilot. Nếu bạn nhận được, tức là mail transporter đã hoạt động! ✅</p>
      `,
    });

    console.log("📬 Mail đã được gửi! Mã:", info.messageId);
  } catch (err) {
    console.error("❌ Gửi mail thất bại:", err);
  }
};

main();
