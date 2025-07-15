document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('password').value;

      registerMessage.textContent = "";
      registerMessage.className = "";

      try {
        const res = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, phone, email, password })
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
});
