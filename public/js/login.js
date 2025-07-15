document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const identity = document.getElementById('identity').value.trim();
      const password = document.getElementById('password').value;

      loginMessage.textContent = "";
      loginMessage.className = "";

      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identity, password })
        });

        const data = await res.json();

        loginMessage.textContent = data.message || (res.ok ? "Đăng nhập thành công!" : "Sai thông tin đăng nhập.");
        loginMessage.className = res.ok ? "success" : "error";

        if (res.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "dashboard.html";
        }
      } catch (err) {
        console.error("💥 Lỗi khi đăng nhập:", err);
        loginMessage.textContent = "Lỗi kết nối máy chủ.";
        loginMessage.className = "error";
      }
    });
  }
});
