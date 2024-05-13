const express = require("express");
const config = require("config");
const app = express();

//Setting
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(config.app.STATIC_PATH));

//Routers
app.use("/api", require("../routers/web"));

module.exports = app;
