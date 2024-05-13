const express = require("express");
const router = express.Router();
const truyenRouters = require("./truyen");
const chapterRouters = require("./chapter");
const userRouters = require("./user");

router.use("/truyen", truyenRouters);
router.use("/chapter", chapterRouters);
router.use("/user", userRouters);

module.exports = router;
