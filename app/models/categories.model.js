const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 4,
    unique: true,
    trim: true,
  },
  parent: { type: Types.ObjectId },
  description: {
    type: String,
  },
});

module.exports = {
  categoryModel: model("category", schema),
};
