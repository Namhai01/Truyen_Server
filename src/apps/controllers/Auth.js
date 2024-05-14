const { createToken } = require("../../libs/jwt_handle");
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
    const { email, password, remember } = req.body;
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
    const token = createToken({ userId: user._id });
    res.cookie("UID", token, { httpOnly: true });
    res.status(200).json({
      status: "success",
      data: {
        username: user.username,
        avatar: user.avatar,
      },
      token: token,
    });
  } catch (error) {
    console.log(error.message);
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
    return res.status(500).json({ error: "Đã xảy ra lỗi khi tạo người dùng." });
  }
};
