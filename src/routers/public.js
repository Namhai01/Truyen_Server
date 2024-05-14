const express = require("express");
const router = express.Router();
const authController = require("../apps/controllers/Auth");
const passport = require("passport");

//AUTH
router.post("/login", authController.logIn);
router.post("/register", authController.register);

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

module.exports = router;
