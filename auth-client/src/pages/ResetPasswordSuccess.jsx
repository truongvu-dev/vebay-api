export default function ResetPasswordSuccess() {
  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h2>🎉 Mật khẩu đã đổi thành công!</h2>
      <p>Bạn có thể đăng nhập bằng mật khẩu mới.</p>
      <a href="/login">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>🔑 Về trang đăng nhập</button>
      </a>
    </div>
  );
}
