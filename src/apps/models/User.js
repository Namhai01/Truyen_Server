const mongoose = require("../../common/db");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
    },
    follower: [
      {
        truyen_info: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Truyens",
        },
        chapter_info: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Chapters",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = (module.exports = mongoose.model(
  "Users",
  userSchema,
  "users"
));

module.exports = userModel;
