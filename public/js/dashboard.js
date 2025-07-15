// 🔐 Kiểm tra token
const token = localStorage.getItem("token");
if (!token) {
  alert("Bạn chưa đăng nhập!");
  window.location.href = "login.html";
}

const apiHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
};

// 🧠 Lấy thông tin người dùng
async function loadProfile() {

     if (user.role === "admin") {
       document.getElementById("adminNav").style.display = "block";
      } else {
       document.getElementById("adminNav").style.display = "none";
      }

  try {
    const res = await fetch("/api/users/profile", {
      headers: apiHeaders
    });

    if (res.status === 401 || res.status === 403) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    const data = await res.json();
    const user = data.user;

    if (!user) {
      alert("Không thể tải hồ sơ người dùng.");
      return;
    }

    // 🎯 Phân quyền: chỉ cho phép admin
    if (user.role !== "admin") {
      alert("Bạn không có quyền truy cập trang này!");
      window.location.href = "/";
      return;
    }
  <nav id="adminNav" style="display: none;">
    <a href="/admin.html">Trang quản trị</a>
  </nav>


    // 📝 Hiển thị thông tin người dùng
    document.getElementById("username").value = user.username || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phone || "";

    document.getElementById("welcome").innerText =
      `🎩 Xin chào, ${user.username} (${user.role})`;

  } catch (err) {
    console.error("❌ Lỗi khi tải hồ sơ:", err);
    alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
  }
}

// 🚪 Xử lý logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
<body>
  <h2 id="welcome">🎩 Xin chào...</h2>

  <div class="user-info">
    <label>Username:</label>
    <input type="text" id="username" disabled />

    <label>Email:</label>
    <input type="email" id="email" disabled />

    <label>Phone:</label>
    <input type="text" id="phone" disabled />
  </div>

  <button id="logoutBtn">Đăng xuất</button>

  <script src="dashboard.js"></script>
</body>


// 🚀 Gọi hàm chính sau khi DOM tải xong
document.addEventListener("DOMContentLoaded", loadProfile);
