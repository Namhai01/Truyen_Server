const userModel = require("../models/User");
module.exports.logIn = async (req, res) => {
  try {
    const { username, password, remember } = req.body;
    const user = await userModel.findOne({ username: username });
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "Tài khoản không tồn tại!" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(404)
        .json({ status: "error", message: "Tài khoản không tồn tại!" });
    res.status(200).json({ status: "ok", message: "ok" });
  } catch (error) {
    console.log(error.message);
  }
};
