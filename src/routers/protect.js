const express = require("express");
const router = express.Router();
const userController = require("../apps/controllers/User");
const truyenController = require("../apps/controllers/Truyen");
const chapterController = require("../apps/controllers/Chapter");
const categoryController = require("../apps/controllers/Category");
const upload = require("../apps/middlewares/Upload");
const checkImageMiddleware = require("../apps/middlewares/CheckType");
//USER
router.get("/user/info", userController.userInfo);

// TRUYEN
router.post(
  "/truyen/upload",
  upload.single("image"),
  checkImageMiddleware,
  truyenController.truyenUpload
);

//CHAPTER
router.post("/truyen/:id/add-chapter", chapterController.add);

// CATEGORY
router.post("/truyen/category", categoryController.storeCategories);

//refreshToken
// router.post("/refreshaccess", authController.refreshAccessToken);

module.exports = router;
