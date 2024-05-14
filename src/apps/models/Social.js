const mongoose = require("../../common/db");

const socialSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/static/images/uploads/avatars/user.jpg",
    },
    facebook_provider: {
      type: Number,
      default: 0,
    },
    google_provider: {
      type: Number,
      default: 0,
    },
    follower: [
      {
        truyen_info: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Truyens",
        },
        chapter: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const socialModel = (module.exports = mongoose.model(
  "socials",
  socialSchema,
  "Socials"
));

module.exports = socialModel;
