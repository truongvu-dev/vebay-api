document.querySelector("#updateBtn").addEventListener("click", () => {
  const token = localStorage.getItem("accessToken");
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;

  fetch("/api/update-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email, phone }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message))
    .catch(() => alert("Lỗi khi cập nhật hồ sơ."));
});
