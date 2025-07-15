// view-profile.js
export async function viewProfile(targetDivId = "profileInfo") {
  const token = localStorage.getItem("token");
  const profileDiv = document.getElementById(targetDivId);
  if (!profileDiv) return;

  profileDiv.innerHTML = "";

  if (!token) {
    profileDiv.innerHTML = "<p style='color: red;'>Bạn chưa đăng nhập!</p>";
    return;
  }

  try {
    const res = await fetch("/api/users/profile", {
      headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();

    if (!res.ok) {
      profileDiv.innerHTML = `<p style='color:red;'>Lỗi: ${data.message || "Không thể truy xuất."}</p>`;
      return;
    }

    const user = data.user || data;
    const isAdmin = user.role === "admin";

    const extraUI = isAdmin
      ? `<p><a href="/admin.html" style="color: blue; font-weight: bold;">🔧 Quản trị</a></p>`
      : `<p style="color: gray;">👋 Xin chào khách hàng!</p>`;

    profileDiv.innerHTML = `
      <div style="border:1px solid #ccc; padding:15px; border-radius:6px; background:#f9f9f9;">
        <h3>👤 Hồ sơ người dùng</h3>
        <p><strong>Họ tên:</strong> ${user.name || user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Vai trò:</strong> <span style="color: green;">${user.role}</span></p>
        <p><strong>ID:</strong> ${user.id || user._id}</p>
        ${extraUI}
      </div>
    `;
  } catch (err) {
    console.error("Lỗi khi tải profile:", err);
    profileDiv.innerHTML = "<p style='color: red;'>Không thể kết nối đến máy chủ.</p>";
  }
}
