const token = localStorage.getItem("token");

document.getElementById("changePasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  try {
    const res = await fetch("/api/users/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert(data.message);
    location.href = "dashboard.html";
  } catch (err) {
    alert("❌ " + err.message);
  }
});

<script src="/js/change-password.js"></script>
