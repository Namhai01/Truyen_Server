const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../../libs/jwt_handle");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");

module.exports.logIn = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, không có dữ liệu.",
      });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, thiếu thông tin đăng ký.",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .json({ status: "error", message: "Tài khoản không tồn tại!" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ status: "error", message: "Sai mật khẩu!" });
    let maxAgeRefreshToken = 15; //60 * 24 * 60 * 60
    const accessToken = await createAccessToken({ userId: user.id });
    const refreshToken = await createRefreshToken(
      { userId: user.id },
      maxAgeRefreshToken
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: maxAgeRefreshToken * 1000, //60days
    });
    res.status(200).json({
      status: "success",
      data: {
        username: user.username,
        avatar: user.avatar,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};

module.exports.register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, không có dữ liệu.",
      });
    }
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, thiếu thông tin đăng ký.",
      });
    }
    const hashPassword = await bcrypt.hashSync(password, 10);
    const user = await userModel.findOne({ email: email });
    if (user)
      return res
        .status(409)
        .json({ status: "error", message: "Email này đã được đăng kí!" });
    const newUser = new userModel({
      email: email,
      username: username,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ status: "success", message: "Đăng kí thành công!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};

module.exports.logOut = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};

//Làm mới accessToken bằng refreshToken
module.exports.refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const decode = await verifyRefreshToken(refreshToken);
    const userId = decode.userId;
    const newAccessToken = await createAccessToken({ userId: userId });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};

module.exports.refreshRefreshToken = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
