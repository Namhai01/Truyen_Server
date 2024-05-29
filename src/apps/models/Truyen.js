const mongoose = require("../../common/db");

// const status = ["New", "Old", "Hot"];
const truyenSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      // required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Categories",
      },
    ],
    // status: {
    //   type: String,
    // },
    description: {
      type: String,
      required: true,
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapters",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const truyenModel = (module.exports = mongoose.model(
  "Truyens",
  truyenSchema,
  "truyens"
));

module.exports = truyenModel;
