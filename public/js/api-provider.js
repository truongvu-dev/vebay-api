// api-provider.js

// Chọn nhà cung cấp hiện tại: 'datacom', 'amadeus', 'traveloka', ...
const API_PROVIDER = 'datacom';

let api;

switch (API_PROVIDER) {
  case 'datacom':
    api = new DatacomAPI(); break;
  case 'amadeus':
    api = new AmadeusAPI(); break;
  default:
    console.error("Không có nhà cung cấp hợp lệ được chọn.");
}

export default api;
