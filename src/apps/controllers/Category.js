const slug = require("slug");
const categoriesModel = require("../models/category");

module.exports.storeCategories = async (req, res) => {
  try {
    const { body } = req;
    if (!body.name || body.description) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, thiếu thông tin.",
      });
    }
    const category = await categoriesModel({
      name: body.name,
      slug: slug(String(body.name)),
      description: body.description,
    }).save();
    if (!category)
      return res.status(400).json({
        status: "error",
        message: "Thêm ko thành công!",
      });

    res.status(200).json({
      status: "success",
      message: "Thêm thành công !",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
