const { getOtpValidate } = require("../../validators/user/auth.validate");

const createHttpError = require("http-errors");

const { userModel } = require("../../../models/users.model");
const { ipPanel } = require("../../../settings");
const {
  generateRandomOtp,
  expireAfterMinutes,
  resSuccess,
  normalizePhone,
} = require("../../../utils/functions");

const Controller = require("../Controller");
const { errorMessage } = require("../../../utils/errors");
class AuthController extends Controller {
  async getOtpCode(req, res, next) {
    try {
      let { phone } = req.body;
      phone = normalizePhone(phone);
      await getOtpValidate.validateAsync(req.body);
      const code = generateRandomOtp(6);
      const expires = expireAfterMinutes(5);
      const result = await userModel.updateOne(
        { phone },
        {
          otp: {
            code,
            expires,
          },
        },
        {
          upsert: true,
        }
      );
      if (!result.acknowledged)
        throw createHttpError.InternalServerError(errorMessage.internalMessage);
      const smsResult = await ipPanel.sendSmsWithPattern(phone, {
        code: code.toString(),
      });
      if (!smsResult)
        throw createHttpError.InternalServerError(errorMessage.internalMessage);
      res.status(201).json({
        ...resSuccess("رمز یکبار مصرف با موفقییت ارسال شد.", 201),
        data: { phone },
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtpCode(req, res, next) {}
}
module.exports = new AuthController();
