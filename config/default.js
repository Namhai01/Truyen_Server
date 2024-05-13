require("dotenv").config();
module.exports = {
  app: {
    PORT: "3001",
    STATIC_PATH: `${__dirname} + /../src/public`,
  },
  DB: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
};
