// booking-ui.js

import api from './api-provider.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');
  const resultDiv = document.getElementById('results');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const from = document.getElementById('from').value.trim().toUpperCase();
    const to = document.getElementById('to').value.trim().toUpperCase();
    const date = document.getElementById('date').value;

    resultDiv.innerHTML = '<p>Đang tìm chuyến bay...</p>';

    const flights = await api.searchFlights({ from, to, date });

    if (flights.length === 0) {
      resultDiv.innerHTML = '<p>Không tìm thấy chuyến nào. Vui lòng thử lại.</p>';
    } else {
      const html = flights.map((f, index) => `
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          ✈️ <strong>${f.flightNumber}</strong> - ${f.from} → ${f.to}<br/>
          🕒 Giờ: ${f.departureTime} → ${f.arrivalTime}<br/>
          💵 Giá: ${f.price} VND<br/>
          <button onclick="alert('Đặt chuyến ${f.flightNumber} đang được xử lý...')">Đặt vé</button>
        </div>
      `).join('');
      resultDiv.innerHTML = html;
    }
  });
});
