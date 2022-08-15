const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  title: { type: String },
  texgt: { type: String },
  image: { type: String, required: true },
  type: { type: String, default: "main" },
});

module.exports = {
  sliderModel: model("slider", schema),
};
