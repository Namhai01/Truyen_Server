const chapterModel = require("../models/Chapter");
const truyenModel = require("../models/Truyen");

module.exports.add = async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const truyen = await truyenModel.findById(id);
    if (!body) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, không có dữ liệu.",
      });
    }
    if (!truyen)
      return res.status(400).json({
        status: "error",
        message: "Không tìm thấy truyện này !",
      });
    const lastChapter = await chapterModel
      .findOne({ _id: { $in: truyen.chapters } })
      .sort({ chapter_num: -1 });
    const nextChapterNum = lastChapter ? lastChapter.chapter_num + 1 : 1;
    const newChapter = await chapterModel.create({
      chapter_num: nextChapterNum,
      body: body.body,
    });
    truyen.chapters = newChapter._id;
    await truyen.save();
    res.status(201).json({
      status: "success",
      message: "Thêm chapter thành công !",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
module.exports.del = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
module.exports.update = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
