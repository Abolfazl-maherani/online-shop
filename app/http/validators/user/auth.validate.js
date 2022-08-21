const createError = require("http-errors");
const Joi = require("joi");
const { errorMessage } = require("../../../utils/errors");
const common = {
  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^(98|\+98|0)?9[0-9]{9}$/)
    .error(createError.BadRequest("شماره همراه اشتباه است")),
};
const getOtpValidate = Joi.object().keys({
  ...common,
});
const verifyOtpValidate = Joi.object({
  ...common,
  code: Joi.number()
    .custom((value, helper) => {
      if (value.toString().length !== 6) return helper.error();
    })
    .required()
    .error(createError.BadRequest(errorMessage.codeValidation)),
});

module.exports = {
  getOtpValidate,
  verifyOtpValidate,
};
