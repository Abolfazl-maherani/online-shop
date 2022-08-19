const authController = require("../../controller/user/auth.controller");

const router = require("express").Router();
router.post("/get-otp", authController.getOtpCode);
module.exports = {
  authRoutes: router,
};
