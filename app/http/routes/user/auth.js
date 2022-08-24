const authController = require("../../controller/user/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 * "/user/get-otp":
 *   post:
 *     tags: [Auth]
 *     summary: "send code with sms to phone setted "
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - name: phone
 *         description: Set phone number
 *         in: body
 *         required: true
 *         type: string
 *         example: {"phone":"9032271936"}
 *     responses:
 *       200:
 *         description: "Send seccess for send sms to the phone"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Is succesed
 *               type: boolean
 *               example: true
 *             message:
 *                description: desctption process
 *                type: String
 *                example: رمز یکبار مصرف با موفقیت ارسال شد
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 200
 *             data:
 *                description: "this field is fix for all success response"
 *                type: object
 *                example: null
 *
 *       400:
 *         description: "잘못된 매개변수"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: "성공 여부"
 *               type: boolean
 *               example: false
 *       500:
 *         description: "internal server (do not send sms to number)"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: رمز یکبار مصرف با موفقیت ارسال شد
 *             status:
 *                description: status process
 *                type: Number
 *                example: 500
 */
router.post("/get-otp", authController.getOtpCode);
router.post("/verify-otp", authController.verifyOtpCode);
router.post("/refresh-token", authController.refreshTokent);
module.exports = {
  authRoutes: router,
};
