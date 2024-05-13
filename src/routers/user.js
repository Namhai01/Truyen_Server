const express = require("express");
const router = express.Router();
const userController = require("../apps/controllers/User");
const authController = require("../apps/controllers/Auth");
//GET
router.get("/", (req, res) => {
  res.send("ok user");
});
router.get("/check", authController.logIn);

module.exports = router;
