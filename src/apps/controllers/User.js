const userModel = require("../models/User");

module.exports.userInfo = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await userModel.findOne({ _id: id });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
};
