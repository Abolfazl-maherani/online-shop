const createHttpError = require("http-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const addCategoryValidate = Joi.object({
  title: Joi.string().error(
    createHttpError.BadRequest("عنوان دسته بندی اشتباه است")
  ),
  parent: Joi.objectId()
    .optional()
    .error(createHttpError.BadRequest("آی دی پرنت اشتباه است")),
});
module.exports = { addCategoryValidate };
