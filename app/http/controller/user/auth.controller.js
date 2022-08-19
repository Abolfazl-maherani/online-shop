const createHttpError = require("http-errors");
const { userModel } = require("../../../models/users.model");
const { ipPanel } = require("../../../settings");
const {
  generateRandomOtp,
  expireAfterMinutes,
} = require("../../../utils/functions");
const Controller = require("../Controller");
class AuthController extends Controller {
  async getOtpCode(req, res, next) {
    try {
      const { phone } = req.body;

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
        throw createHttpError.InternalServerError("خطای ناشناخته سرور");
      const smsResult = ipPanel.sendSms(
        ` خوش آمدید کد ورود شما این پیام جهت تست میباشد ${code}`,
        phone
      );
      console.log(await smsResult);
      res.json({
        status: 200,
        sucsess: true,
        data: {
          code,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyOtpCode(req, res, next) {}
}
module.exports = new AuthController();
