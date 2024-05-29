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
    const file = req.file;
    if (!file) {
      return res
        .status(500)
        .json({ status: "error", message: "Please upload a file!" });
    }
    const { body } = req;
    if (!body.title || !body.author || !body.description || !body.categories) {
      return res.status(400).json({
        status: "error",
        message: "Yêu cầu không hợp lệ, thiếu thông tin của truyện.",
      });
    }
    const name = slug(body.title, "_");
    const thumbnail = await uploadImage(file, "truyen", name);
    await truyenModel({
      title: body.title,
      thumbnail: thumbnail,
      author: body.author,
      categories: body.categories,
      description: body.description,
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
module.exports.getTruyen = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = parseInt(req.query.page) || 1;
    const skip = (currentPage - 1) * limit;
    const query = {};
    const sortBy =
      req.query.filter == "view" ? { view: -1, rate: -1 } : { _id: -1 };
    const keywords = req.query.key;
    if (keywords && keywords.trim() !== "") {
      query.title = { $regex: new RegExp(keywords, "i") };
    }
    const totalRow = await truyenModel.find(query).countDocuments();
    const pages = pagination(currentPage, limit, totalRow);
    const totalPages = Math.ceil(totalRow / limit);
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
        },
        pages: {
          page: pages,
          totalPages: totalPages,
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
