const mongoose = require("../../common/db");

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const categoriesModel = (module.exports = mongoose.model(
  "Categories",
  categoriesSchema,
  "categories"
));

module.exports = categoriesModel;
