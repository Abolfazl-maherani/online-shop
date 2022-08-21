const createError = require("http-errors");
const Joi = require("joi");

const getOtpValidate = Joi.object().keys({
  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^(98|\+98|0)?9[0-9]{9}$/)
    .error(createError.BadRequest("شماره همراه اشتباه است")),
});

module.exports = {
  getOtpValidate,
};
