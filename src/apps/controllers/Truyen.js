const { uploadImage } = require("../../libs/firebase_handle");
var slug = require("slug");
const pagination = require("../../libs/pagination");
const truyenModel = require("../models/Truyen");

module.exports.truyenUpload = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, không có dữ liệu.",
      });
    }
    const { body } = req;
    if (!body.title || !body.author || !body.description || !body.categories) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, thiếu thông tin của truyện.",
      });
    }
    const file = req.file;
    const name = slug(body.title, "_");
    let truyenData = {
      title: body.title,
      author: body.author,
      categories: body.categories,
      description: body.description,
    };
    if (file) {
      const thumbnail = await uploadImage(file, "truyen", name);
      truyenData.thumbnail = thumbnail;
    }

    await truyenModel(truyenData).save();
    res.status(201).json({
      status: "success",
      message: "Thêm truyện thành công!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
module.exports.getTruyen = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = page * limit - limit;
    const query = {};
    const sortBy =
      req.query.filter == "view"
        ? { view: -1 }
        : { _id: -1 } && req.query.filter == "rate"
        ? { rate: -1 }
        : { _id: -1 };
    const keywords = req.query.key;
    if (keywords && keywords.trim() !== "") {
      query.title = { $regex: new RegExp(keywords, "i") };
    }
    const truyen = await truyenModel
      .find(query)
      .populate({ path: "categories" })
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .exec();
    res.status(200).json({
      status: "success",
      data: {
        truyen,
        filters: {
          limit,
          key,
          filter,
        },
        pages: {
          page: await pagination(truyenModel, query, page, limit),
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
module.exports.getTruyenId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(401).json({
        status: "error",
        message: "Không tìm thấy truyện!",
      });
    const truyen = await truyenModel
      .findById(id)
      .populate({ path: "chapters" })
      .exec();
    res.status(200).json({
      status: "success",
      data: {
        truyen,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
module.exports.filterCategories = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Đã xảy ra lỗi!" });
  }
};
