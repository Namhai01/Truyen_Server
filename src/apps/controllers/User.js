const userModel = require("../models/User");

module.exports.User = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
};
