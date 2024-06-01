const path = require("path");
const checkImageMiddleware = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu image",
    });
  }

  const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const ext = path.extname(req.file.originalname).toLowerCase();

  if (!validExtensions.includes(ext)) {
    return res.status(400).json({
      status: "error",
      message: `Lỗi định dạng: ${ext}. chỉ nhận file có .jpg, .jpeg, .png, .gif.`,
    });
  }

  next();
};
module.exports = checkImageMiddleware;
