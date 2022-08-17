const createError = require("http-errors");
const Joi = require("joi");

const authValidate = Joi.object().keys({
  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^09[0-9]{9}$/)
    .messages({
      "any.required": "شماره همراه وارد نشده",
      "string.pattern.base": "شماره همراه وارد شده اشتباه است",
    }),

  password: Joi.string().required().trim().min(6).max(16).messages({
    "any.required": "پسورد وارد نشده",
    "string.min": "حداقل طول پسورد 6 و حداکثر 16",
    "string.max": "حداقل طول پسورد 6 و حداکثر 16",
  }),
});
console.log(
  authValidate.validate(
    { password: "asf", phone: "0906654" },
    { abortEarly: false }
  ).error
);
module.exports = {
  authValidate,
};
