const { verifyAccessToken } = require("../../libs/jwt_handle");

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = await verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    if (error.status === 401) {
      return res.sendStatus(401);
    } else {
      return res.sendStatus(403);
    }
  }
}

module.exports = authenticateToken;
