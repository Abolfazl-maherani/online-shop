const {
  Schema,
  model,
  Types,
  default: mong,
  Model,
  default: mongoose,
} = require("mongoose");
const otpSchema = new Schema(
  {
    code: { type: Number, default: 0 },
    expires: { type: Date, default: 0 },
  },
  { _id: false }
);

const schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      sparse: true,
      index: true,
    },
    phone: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    password: { type: String, required: true },
    otp: otpSchema,
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: Date },
    roles: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", schema);

module.exports = {
  userModel,
};
