const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("config");
const bcrypt = require("bcrypt");
const socialModel = require("../../models/Social");
const FacebookLogin = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.FACEBOOK_APP_ID,
        clientSecret: config.facebook.FACEBOOK_APP_SECRET,
        callbackURL: config.facebook.callbackURL,
        profileFields: ["id", "displayName", "email", "photos"], // Đảm bảo có trường "photos"
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const customerinfo = {
            full_name: profile._json.name,
            email: profile._json.email,
            facebook_provider: profile._json.id,
            avatar: profile.photos[0].value,
            password: await bcrypt.hash(profile._json.id, 10),
          };

          let user = await socialModel.findOne({
            email: customerinfo.email,
          });

          if (user) {
            if (!user.facebook_provider) {
              await socialModel.findOneAndUpdate(
                { email: customerinfo.email },
                {
                  $set: {
                    facebook_provider: customerinfo.facebook_provider,
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
          console.error("Error in Facebook authentication strategy:", error);
          return cb(error, null);
        }
      }
    )
  );
};
module.exports = FacebookLogin;
