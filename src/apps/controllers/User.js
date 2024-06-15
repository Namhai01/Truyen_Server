const userModel = require("../models/User");

module.exports.userInfo = async (req, res) => {
  try {
    const id = req.user;
    const user = await userModel
      .findOne({ _id: id })
      .populate("follower.truyen_info");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }
    const { password, ...data } = user._doc;
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
module.exports.followTruyen = async (req, res) => {
  try {
    const id = req.user;
    const user = await userModel.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    const { idtruyen, chapter } = req.query;
    if (!idtruyen) {
      return res.status(400).json({ message: "id are required." });
    }

    const existingFollower = user.follower.find((f) =>
      f.truyen_info.equals(idtruyen)
    );

    if (existingFollower) {
      existingFollower.chapter = chapter;
    } else {
      user.follower.push({ truyen_info: idtruyen, chapter });
    }

    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Theo dõi truyện thành công" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
