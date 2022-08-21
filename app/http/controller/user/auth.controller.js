const {
  getOtpValidate,
  verifyOtpValidate,
} = require("../../validators/user/auth.validate");

const createHttpError = require("http-errors");

const { userModel } = require("../../../models/users.model");
const { ipPanel } = require("../../../settings");
const {
  generateRandomOtp,
  expireAfterMinutes,
  resSuccess,
  normalizePhone,
  signJwt,
} = require("../../../utils/functions");

const Controller = require("../Controller");
const { errorMessage } = require("../../../utils/errors");
const { checkExistInDb } = require("../../../utils/query");
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

      //Enable in production Mode
      // const smsResult = await ipPanel.sendSmsWithPattern(phone, {
      //   code: code.toString(),
      // });
      // if (!smsResult)
      //   throw createHttpError.InternalServerError(errorMessage.internalMessage);
      console.log("code", code);
      res.status(201).json({
        ...resSuccess("رمز یکبار مصرف با موفقییت ارسال شد.", 201),
        data: { phone },
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtpCode(req, res, next) {
    try {
      await verifyOtpValidate.validateAsync(req.body);
      let { phone, code } = req.body;
      phone = normalizePhone(phone);
      console.log(phone);
      const now = Date.now();
      if (!(await checkExistInDb(userModel, { phone })))
        throw createHttpError.NotFound(errorMessage.notFoundUser);
      const result = await userModel.findOneAndUpdate(
        {
          phone,
          "otp.code": code,
          "otp.expires": {
            $gte: now,
          },
        },
        {
          $set: {
            status: "ACTIVE",
          },
        },
        {
          projection: { password: 0 },
          new: true,
        }
      );

      if (!result) throw createHttpError.BadRequest(errorMessage.notVerifyOtp);
      const token = await signJwt({ phone: result.phone, userId: result._id });
      res.status(201).json({
        ...resSuccess("باموفقیت لاگین شدید", 201),
        data: {
          ...result.toObject(),
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
