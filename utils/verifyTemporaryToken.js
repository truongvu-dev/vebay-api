import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export function verifyTemporaryToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject("Token không hợp lệ hoặc đã hết hạn.");
      }
      resolve(decoded);
    });
  });
}
