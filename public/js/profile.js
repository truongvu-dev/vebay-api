const token = localStorage.getItem("accessToken");

fetch("/api/profile", {
  headers: { Authorization: `Bearer ${token}` },
})
.then(res => res.json())
.then(data => {
  document.querySelector("#username").value = data.user.username;
  document.querySelector("#email").value = data.user.email;
  document.querySelector("#phone").value = data.user.phone;
});
