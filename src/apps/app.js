const express = require("express");
const config = require("config");
const cors = require("cors");
const GoogleLogin = require("../apps/controllers/social/GG_Controller");
const FacebookLogin = require("../apps/controllers/social/FB_Controller");
const session = require("express-session");
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { default: RedisStore } = require("connect-redis");
const client = require("../libs/redis");

require("../libs/redis");
const app = express();

//Setting
const cosrOrigin = {
  origin: "*",
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(cosrOrigin));
app.use(cookiesParser());
app.use("/static", express.static(config.app.STATIC_PATH));

//Session
app.use(
  session({
    store: new RedisStore({ client: client }),
    secret: config.app.session_key,
    resave: false,
    saveUninitialized: true,
  })
);

//Routers
app.use("/api/v1", require("../routers/web"));

GoogleLogin();
FacebookLogin();

module.exports = app;
