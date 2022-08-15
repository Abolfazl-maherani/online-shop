const { Schema, model, Types } = require("mongoose");
const schema = new Schema({});

module.exports = {
  paymentModel: model("payment", schema),
};
