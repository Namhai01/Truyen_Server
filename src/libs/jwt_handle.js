const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

// Tạo một JWT từ thông tin payload
function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token sẽ hết hạn sau 1 giờ
}

// Xác thực JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null; // Nếu JWT không hợp lệ, trả về null
  }
}

module.exports = {
  createToken,
  verifyToken,
};
