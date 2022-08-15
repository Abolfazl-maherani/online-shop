const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true, lowercase: true },
  phone: { type: String },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  otp: {
    type: Object,
    default: {
      code: 0,
      expires: 0,
    },
  },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: Date },
  roles: { type: [String], default: ["user"] },
});

module.exports = {
  userModel: model("user", schema),
};
