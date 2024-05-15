const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");
const passport = require("passport");
const bcrypt = require("bcrypt");
const socialModel = require("../../models/Social");
const GoogleLogin = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const customerinfo = {
            full_name: profile._json.given_name,
            email: profile._json.email,
            google_provider: profile._json.sub,
            avatar: profile._json.picture,
            password: await bcrypt.hash(profile._json.sub, 10),
          };

          let user = await socialModel.findOne({
            email: customerinfo.email,
          });

          if (user) {
            if (!user.google_provider) {
              await socialModel.findOneAndUpdate(
                { email: customerinfo.email },
                {
                  $set: {
                    google_provider: customerinfo.google_provider,
                    avatar: customerinfo.avatar,
                  },
                }
              );
            }
          } else {
            user = await new socialModel(customerinfo).save();
          }

          return cb(null, user);
        } catch (error) {
          console.error("Error in Google authentication strategy:", error);
          return cb(error, null);
        }
      }
    )
  );
};

module.exports = GoogleLogin;
