// partials-loader.js
export async function loadPartials(partials) {
  for (const { id, url, callback } of partials) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`❌ Không thể tải ${url}`);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;

      // Nếu có callback, gọi sau khi chèn xong
      if (typeof callback === "function") callback();
    } catch (err) {
      console.error(`Lỗi khi tải ${url}:`, err.message);
    }
  }
}
