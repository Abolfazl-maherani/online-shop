const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  title: { type: String, required: true },
  short_desc: { type: String, required: true },
  total_desc: { type: String, required: true },
  image: { type: [String], required: true },
  tags: { type: [String] },
  category: { type: [Types.ObjectId], required: true },
  comments: { type: [String], default: [] },
  like: { type: [Types.ObjectId], default: [] },
  deslike: { type: [Types.ObjectId], default: [] },
  bookMark: { type: [Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, default: "physical" },
  time: { type: String },
  format: { type: String },
  teacher: { type: Types.ObjectId },
  sizefeature: {
    type: Object,
    default: {
      length: null,
      heaight: null,
      width: null,
      weight: null,
      colors: [],
    },
  },
});

module.exports = {
  productModel: model("product", schema),
};
