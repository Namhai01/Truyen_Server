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
      default: "/static/images/uploads/avatars/user.jpg",
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
          default: 0,
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
