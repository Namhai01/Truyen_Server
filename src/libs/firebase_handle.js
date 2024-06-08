const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("../common/firebase");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `${process.env.DATABASE_URL}`,
  storageBucket: `${process.env.BUCKET}`,
});

const uploadImage = (file, location, name) => {
  return new Promise((resolve, reject) => {
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(`${location}/${name}`);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (error) => {
      console.error("Lỗi khi tải ảnh lên Firebase Storage:", error);
      reject("Lỗi khi tải ảnh lên Firebase Storage");
    });

    stream.on("finish", () => {
      fileUpload
        .getSignedUrl({
          action: "read",
          expires: Date.now() + 99 * 365 * 24 * 60 * 60 * 1000, // 99 years
        })
        .then((signedUrls) => {
          const imageUrl = signedUrls[0];
          resolve(imageUrl);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy URL ảnh:", err);
          reject("Lỗi khi lấy URL ảnh");
        });
    });

    stream.end(file.buffer);
  });
};

const delImage = (filename, location, res) => {
  const bucket = admin.storage().bucket();
  const file = bucket.file(`${location}/${filename}`);

  file
    .delete()
    .then(() => {
      console.log("Đã xóa ảnh thành công");
      res.status(200).json({
        status: "success",
        message: "Xoá thành công !",
      });
    })
    .catch((error) => {
      console.error("Lỗi khi xóa ảnh:", error);
      res.status(500).json({
        status: "error",
        message: "Xoá không thành công !",
      });
    });
};

module.exports = { uploadImage, delImage };
