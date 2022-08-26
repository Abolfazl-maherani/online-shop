const createHttpError = require("http-errors");
const { errorMessage } = require("../../utils/errors");
const jwt = require("jsonwebtoken");
const { SIGN_JWT } = require("../../utils/constatn");
const { userModel } = require("../../models/users.model");
const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw createHttpError.Unauthorized(errorMessage.unAuthorization);
    const [bearer, token] = authorization.split(" ");
    if (bearer.toLowerCase() !== "bearer" && !token)
      throw createHttpError.Unauthorized(errorMessage.unAuthorization);

    let payload = null;
    jwt.verify(token, SIGN_JWT, (err, decode) => {
      if (err) throw createHttpError.Unauthorized(errorMessage.unAuthorization);
      payload = decode;
    });

    const { phone } = payload;
    const user = await userModel.findOne(
      { phone },
      { password: 0, otp: 0, __v: 0 }
    );
    if (!user) throw createHttpError.Unauthorized(errorMessage.unAuthorization);
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = verifyToken;
