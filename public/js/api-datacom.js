// api-datacom.js

class DatacomAPI {
  constructor() {
    this.baseURL = 'https://sandbox.datacom.vn/api/flight'; // ví dụ, bạn thay URL thật ở đây
    this.apiKey = 'YOUR_API_KEY_HERE'; // bạn điền key thật khi có
  }

  async searchFlights(params) {
    // params = { from, to, date }
    try {
      // Gửi yêu cầu GET hoặc POST tùy theo tài liệu Datacom
      const response = await fetch(`${this.baseURL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey
        },
        body: JSON.stringify({
          from: params.from,
          to: params.to,
          date: params.date
        })
      });

      const data = await response.json();
      return data.flights || []; // giả sử kết quả nằm trong flights[]
    } catch (err) {
      console.error('Lỗi gọi API Datacom:', err);
      return [];
    }
  }

  async bookTicket(info) {
    // info = { flightId, name, email, phone }
    alert("👉 Chức năng đặt vé Datacom đang được xây dựng.");
    // Sau này bạn gọi POST /book của Datacom ở đây
  }
}
