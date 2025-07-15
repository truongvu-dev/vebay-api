import React, { useState } from "react";

export default function GuestBooking() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    tripType: "oneway",
    adults: 1,
    children: 0,
    babies: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Khách đang tìm chuyến bay với thông tin:", form);
    // Gửi API tìm chuyến bay hoặc điều hướng tới trang kết quả
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>🛫 Đặt vé máy bay</h2>
      <form onSubmit={handleSubmit}>
        <label>Loại chuyến:</label>
        <select name="tripType" onChange={handleChange} value={form.tripType}>
          <option value="oneway">Một chiều</option>
          <option value="roundtrip">Khứ hồi</option>
        </select>

        <label>Điểm đi:</label>
        <input type="text" name="from" onChange={handleChange} value={form.from} placeholder="Ví dụ: SGN" />

        <label>Điểm đến:</label>
        <input type="text" name="to" onChange={handleChange} value={form.to} placeholder="Ví dụ: HAN" />

        <label>Ngày đi:</label>
        <input type="date" name="departDate" onChange={handleChange} value={form.departDate} />

        {form.tripType === "roundtrip" && (
          <>
            <label>Ngày về:</label>
            <input type="date" name="returnDate" onChange={handleChange} value={form.returnDate} />
          </>
        )}

        <label>Người lớn:</label>
        <input type="number" name="adults" min={1} onChange={handleChange} value={form.adults} />

        <label>Trẻ em:</label>
        <input type="number" name="children" min={0} onChange={handleChange} value={form.children} />

        <label>Em bé:</label>
        <input type="number" name="babies" min={0} onChange={handleChange} value={form.babies} />

        <br />
        <button type="submit">🔍 Tìm chuyến bay</button>
      </form>
    </div>
  );
}
