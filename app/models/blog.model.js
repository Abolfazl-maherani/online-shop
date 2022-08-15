const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  author: {
    type: Types.ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: {
    type: [Types.ObjectId],
    default: [],
    required: true,
  },
  comments: { type: Types.Array, default: [] },
  like: { type: [Types.ObjectId], default: [] },
  deslike: {
    type: [Types.ObjectId],
    default: [],
  },
  bookmark: {
    type: [Types.ObjectId],
    default: [],
  },
});
module.exports = {
  blogModel: model("blog", schema),
};
