const mongoose = require("../../common/db");

// const status = ["New", "Old", "Hot"];
const truyenSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    view: {
      type: Number,
      default: 0,
    },
    // status: {
    //   type: String,
    // },
    description: {
      type: String,
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chapters",
    },
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
