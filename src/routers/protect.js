const express = require("express");
const router = express.Router();
const userController = require("../apps/controllers/User");
const truyenController = require("../apps/controllers/Truyen");
//USER
router.get("/user/info", userController.userInfo);

//TRUYEN
// router.get("/truyen", truyenController.);

module.exports = router;
