const userModel = require("../models/User");

module.exports.userInfo = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({
      status: "success",
      data: {
        others,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
