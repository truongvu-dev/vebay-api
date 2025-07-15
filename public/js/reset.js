document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resetForm");
  const message = document.getElementById("message");
  const btn = document.getElementById("submitBtn");
  const btnText = btn.querySelector(".btn-text");
  const spinner = btn.querySelector(".spinner");
  const backLogin = document.getElementById("backLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    message.textContent = "";
    backLogin.style.display = "none";

    if (!email) {
      message.textContent = "⚠️ Vui lòng nhập email.";
      message.style.color = "red";
      return;
    }

    btn.classList.add("loading");
    btnText.textContent = "Đang gửi...";
    spinner.style.display = "inline";

    try {
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        message.innerHTML = `✅ ${data.message}<br><small>📥 Kiểm tra cả <b>Spam</b> hoặc <b>Quảng cáo</b>.</small>`;
        message.style.color = "green";
        backLogin.style.display = "block";
      } else {
        message.textContent = data.message || "Có lỗi xảy ra.";
        message.style.color = "red";
      }
    } catch (err) {
      message.textContent = "🚫 Lỗi kết nối máy chủ.";
      message.style.color = "red";
    } finally {
      btn.classList.remove("loading");
      btnText.textContent = "Gửi liên kết khôi phục";
      spinner.style.display = "none";
    }
  });
});
