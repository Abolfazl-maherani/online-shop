const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { SIGN_JWT, REFRESH_JWT } = require("./constatn");
const { errorMessage } = require("./errors");
const generateRandomOtp = (length = 5) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);
  return Math.floor(Math.random() * (max - min) + min);
};
const expireAfterMinutes = (minutes) => {
  if (!Number.isInteger(minutes)) return;
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};
const normalizePhone = (phone) => {
  if (typeof phone !== "string") return;
  if (!phoneIsValid(phone)) return;
  const normalize = phone.substring(phone.length, phone.length - 10).trim();
  return normalize;
};
const phoneIsValid = (phone) => {
  if (typeof phone !== "string") return;
  const match = /^(98|\+98|0)?9[0-9]{9}$/;
  return match.test(phone);
};
const resSuccess = (message = null, status = 200) => {
  if (!Number.isInteger(status)) return;
  message = message ? message : "درخواست شما موفقیت آمیز بود";
  return {
    message,
    status,
    success: true,
  };
};
function signJwt(payload, sign = undefined) {
  return new Promise((resolve, reject) => {
    sign = sign ? sign : SIGN_JWT;
    console.log("sign", sign);
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(payload, sign, options, (err, token) => {
      if (err)
        reject(
          createHttpError.InternalServerError(errorMessage.internalMessage)
        );
      resolve(token);
    });
  });
}
function signRefreshJwt(payload, sign = undefined) {
  return new Promise((resolve, reject) => {
    sign = sign ? sign : REFRESH_JWT;
    const options = {
      expiresIn: "1y",
    };
    jwt.sign(payload, sign, options, (err, token) => {
      if (err) {
        reject(
          createHttpError.InternalServerError(errorMessage.internalMessage)
        );
      }
      resolve(token);
    });
  });
}
function verifyRefreshJwt(token) {
  let payload = null;
  jwt.verify(token, REFRESH_JWT, (err, decode) => {
    if (err) throw createHttpError.Unauthorized(errorMessage.unAuthorization);
    payload = decode;
  });
  return payload;
}
module.exports = {
  generateRandomOtp,
  expireAfterMinutes,
  normalizePhone,
  phoneIsValid,
  resSuccess,
  signJwt,
  signRefreshJwt,
  verifyRefreshJwt,
};
