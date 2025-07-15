import bcrypt from "bcryptjs";

// Thay "$2b$10$xyz..." bằng giá trị hash thực tế lấy từ cơ sở dữ liệu
const hash = "$2b$10$xyz...";
const plainPassword = "123456";

console.log(bcrypt.compareSync(plainPassword, hash));