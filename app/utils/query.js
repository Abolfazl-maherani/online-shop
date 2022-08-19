const { Model } = require("mongoose");

const checkExistInDb = async (model, filter = {}) => {
  if (!checkIsModel(model)) return;
  const result = await model.countDocuments(filter);
  return !!result;
};
const checkIsModel = (model) => Object.getPrototypeOf(model) === Model;

module.exports = {
  checkExistInDb,
  checkIsModel,
};
