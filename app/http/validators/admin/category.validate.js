const Joi = require("joi");

const addCategoryValidate = Joi.object({
  title: Joi.string(),
});
module.exports = { addCategoryValidate };
