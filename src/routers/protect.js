const express = require("express");
const router = express.Router();
const userController = require("../apps/controllers/User");
const truyenController = require("../apps/controllers/Truyen");
const authController = require("../apps/controllers/Auth");
const upload = require("../apps/middlewares/Upload");
//USER
router.get("/user/info", userController.userInfo);

// TRUYEN
router.post(
  "/truyen/upload",
  upload.single("image"),
  truyenController.truyenUpload
);

//refreshToken
// router.post("/refreshaccess", authController.refreshAccessToken);

module.exports = router;
