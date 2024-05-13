const mongoose = require("../../common/db");

const chapterSchema = new mongoose.Schema(
  {
    chapter_num: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chapterModel = (module.exports = mongoose.model(
  "Chapters",
  chapterSchema,
  "chapters"
));

module.exports = chapterModel;
