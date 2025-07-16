const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  fetch(`/api/verify-email?token=${token}`)
    .then(res => {
      if (res.ok) {
        window.location.href = "/login.html?verified=true";
      } else {
        alert("❌ Token không hợp lệ hoặc đã hết hạn.");
      }
    })
    .catch(() => alert("🚨 Lỗi khi xác minh tài khoản."));
}
