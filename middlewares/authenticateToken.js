import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Thiếu token truy cập." });

  jwt.verify(token, process.env.SECRET_KEY || "default_secret", (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ." });
    req.user = user;
    next();
  });
}
