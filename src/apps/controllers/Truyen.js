const { uploadImage } = require("../../libs/firebase_handle");
var slug = require("slug");
const truyenModel = require("../models/Truyen");
module.exports.truyenUpload = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, không có dữ liệu.",
      });
    }
    const file = req.file;
    if (!file) {
      return res
        .status(500)
        .json({ status: "error", message: "Please upload a file!" });
    }
    const { title, author, description } = req.body;
    if (!title || !author || !description) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, thiếu thông tin của truyện.",
      });
    }
    const name = slug(title, "_");
    const thumbnail = await uploadImage(file, "truyen", name);
    await truyenModel({
      title: title,
      thumbnail: thumbnail,
      author: author,
      description: description,
    }).save();
    res.status(201).json({
      status: "success",
      message: "Thêm truyện thành công!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
