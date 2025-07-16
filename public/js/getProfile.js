const token = localStorage.getItem("accessToken");

fetch("/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const user = data.user;
    document.querySelector("#username").value = user.username;
    document.querySelector("#email").value = user.email;
    document.querySelector("#phone").value = user.phone;
  })
  .catch(() => alert("Không lấy được thông tin người dùng."));
