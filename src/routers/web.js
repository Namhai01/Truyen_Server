const express = require("express");
const router = express.Router();
const protectRouter = require("./protect");
const publicRouter = require("./public");

const authenticateToken = require("../apps/middlewares/Auth");

router.use("/auth", authenticateToken, protectRouter);
router.use("/public", publicRouter);

module.exports = router;
