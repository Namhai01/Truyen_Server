require("dotenv").config();
module.exports = {
  app: {
    PORT: "3001",
    STATIC_PATH: `${__dirname} + /../src/public`,
    tmp: `${__dirname}/../src/tmp/`,
    session_key: process.env.SESSION_KEY,
    session_secure: false,
  },
  DB: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_ClIENT_SECRET,
    callbackURL: "http://localhost:3001/api/v1/public/google/redirect",
  },
  facebook: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/api/v1/public/facebook/redirect",
  },
};
