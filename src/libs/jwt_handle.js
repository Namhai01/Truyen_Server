const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("./redis");
require("dotenv").config();
const secretAccessKey = process.env.ACCESS_SECRET_KEY;
const secretRefreshKey = process.env.REFRESH_SECRET_KEY;

// Tạo một JWT từ thông tin payload
function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretAccessKey, { expiresIn: "10m" }, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
}

function createRefreshToken(payload, maxAge) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretRefreshKey, { expiresIn: maxAge }, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      client.SET(payload.userId, token, { EX: maxAge }, (err, reply) => {
        if (err) {
          reject(createError.InternalServerError());
          return;
        }
        console.log(reply);
      });
      resolve(token);
    });
  });
}

// Xác thực JWT
function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretAccessKey, (err, decoded) => {
      if (err) {
        reject(createError(401, "Invalid access token"));
      } else {
        resolve(decoded);
      }
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretRefreshKey, (err, decoded) => {
      if (err) {
        reject(createError(401, "Invalid refresh token"));
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
