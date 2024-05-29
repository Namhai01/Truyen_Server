const express = require("express");
const router = express.Router();
const authController = require("../apps/controllers/Auth");
const truyenController = require("../apps/controllers/Truyen");
const passport = require("passport");

//AUTH
router.post("/login", authController.logIn);
router.post("/register", authController.register);
router.post("/refreshAccessToken", authController.refreshAccessToken);

//AUTH GG
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    res.json({
      status: "success",
      data: {
        username: req.user.full_name,
        avatar: req.user.avatar,
      },
    });
  }
);

//AUTH FB
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.json({
      status: "success",
      data: {
        username: req.user.full_name,
        avatar: req.user.avatar,
      },
    });
  }
);

//TRUYEN
router.get("/truyen", truyenController.getTruyen);
router.get("/truyen/:id", truyenController.getTruyenId);

module.exports = router;
