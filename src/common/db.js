const mongoose = require("mongoose");
const config = require("config");
mongoose.connect(config.DB.MONGODB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connect to MongoDB:"));
db.once("open", () => {
  console.log("Connect to MongoDB");
});

module.exports = mongoose;
