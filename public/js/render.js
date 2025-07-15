document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "dashboard";

  const content = document.getElementById("content");
  const pageTitle = document.getElementById("pageTitle");

  try {
    const res = await fetch(`/pages/${page}.html`);
    const html = await res.text();
    content.innerHTML = html;
    pageTitle.textContent = `${page[0].toUpperCase() + page.slice(1)} | Ứng dụng`;

    // Gọi JS riêng nếu có
    const pageScript = `/js/${page}.js`;
    const exists = await fetch(pageScript, { method: "HEAD" });
    if (exists.ok) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = pageScript;
      document.body.appendChild(script);
    }
  } catch (err) {
    content.innerHTML = "<p style='color:red;'>Không thể tải nội dung trang.</p>";
  }
});
