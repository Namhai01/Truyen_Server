const express = require("express");
const config = require("config");
const GoogleLogin = require("../apps/controllers/social/GG_Controller");
const FacebookLogin = require("../apps/controllers/social/FB_Controller");
const session = require("express-session");
const app = express();

//Setting
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(config.app.STATIC_PATH));

//Session
app.use(
  session({
    secret: config.app.session_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.app.session_secure },
  })
);

//Routers
app.use("/api/v1", require("../routers/web"));
GoogleLogin();
FacebookLogin();

module.exports = app;
