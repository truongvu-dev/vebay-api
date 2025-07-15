import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const { token } = useAuth();
  const [agencyInfo, setAgencyInfo] = useState(null);

  useEffect(() => {
    const fetchAgencyInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/agency/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgencyInfo(res.data);
      } catch (err) {
        toast.error("Không thể lấy thông tin đại lý!");
      }
    };

    if (token) fetchAgencyInfo();
  }, [token]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👋 Chào mừng đến Dashboard</h2>

      {agencyInfo ? (
        <div>
          <p><strong>Mã đại lý:</strong> {agencyInfo.code}</p>
          <p><strong>Tên đại lý:</strong> {agencyInfo.name}</p>
          <p><strong>Email:</strong> {agencyInfo.email}</p>
          <p><strong>Quota còn lại:</strong> {agencyInfo.quota} vé</p>
        </div>
      ) : (
        <p>⏳ Đang tải thông tin đại lý...</p>
      )}
    </div>
  );
}
