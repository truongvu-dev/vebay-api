document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Đăng ký
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('registerEmail').value.trim();

      registerMessage.textContent = "";
      registerMessage.className = "";

      try {
        const res = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, phone, email })
        });

        const data = await res.json();
        registerMessage.textContent = data.message || (res.ok ? "🎉 Đăng ký thành công!" : "Đăng ký thất bại.");
        registerMessage.className = res.ok ? "success" : "error";

        if (res.ok) registerForm.reset();
      } catch (err) {
        console.error("💥 Lỗi khi đăng ký:", err);
        registerMessage.textContent = "Lỗi kết nối máy chủ.";
        registerMessage.className = "error";
      }
    });
  }

  // 🔹 Đăng nhập
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
          // window.location.href = "/dashboard.html"; // ← Bỏ comment nếu muốn điều hướng
        }
      } catch (err) {
        console.error("💥 Lỗi khi đăng nhập:", err);
        loginMessage.textContent = "Lỗi kết nối máy chủ.";
        loginMessage.className = "error";
      }
    });
  }

  // 🔹 Đăng xuất
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem("token");
      alert("👋 Đã đăng xuất!");
      window.location.href = "/index.html";
    });
  }
});
