// D:\NodeServer\utils\sendMail.js
import transporter from "./transporter.js";

export const sendVerificationEmail = async (toEmail, token) => {
  const mailOptions = {
    from: `"Hệ thống xác thực 👨‍💻" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Xác minh tài khoản của bạn",
    html: `
      <h2>Xin chào!</h2>
      <p>Bạn vừa đăng ký tài khoản. Vui lòng xác minh bằng cách nhấn vào liên kết dưới đây:</p>
      <a href="${process.env.BASE_URL}/verify-email.html?token=${token}">Xác minh tài khoản</a>
      <p>Nếu bạn không yêu cầu điều này, hãy bỏ qua email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("📬 ✅ Đã gửi mail xác minh đến:", toEmail);
};
