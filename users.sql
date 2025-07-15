-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mật khẩu: 123456 (băm sẵn bằng bcrypt)
-- Sử dụng: username: admin, email: admin@example.com

INSERT INTO users (username, email, phone, password, role, is_verified)
VALUES (
  'adminmaster',
  'admin@example.com',
  '0900123456',
  '$2a$10$kVi/5iYzSuZA.OMUHJfKROPA6208U/ZtzfdyhPRjdL3Y2dxDqv7Nu', -- 123456
  'admin',
  true
);
