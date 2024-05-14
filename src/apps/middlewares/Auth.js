const { verifyToken } = require("../../libs/jwt_handle");
function authenticateToken(req, res, next) {
  // Lấy token từ header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized nếu không có token
  }
  const user = verifyToken(token);
  if (user) {
    req.user = user; // Lưu thông tin người dùng vào req.user
    next();
  } else {
    res.sendStatus(403); // Forbidden nếu token không hợp lệ
  }
}
module.exports = authenticateToken;
