const authController = require("../../controller/user/Auth.controller");

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
 *       201:
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
 *                example: 201
 *             data:
 *                description: "this field is fix for all success response"
 *                type: object
 *                example: null
 *
 *       400:
 *         description: "phone is incorrect"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Is Unsuccess
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: "شماره همراه صحیح نیست"
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 400
 *       500:
 *         description: "internal server (do not send sms to number)"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Unsuccessful
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: "خطای ناشناخته سرور"
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 500
 */
router.post("/get-otp", authController.getOtpCode);

/**
 * @swagger
 * "/user/verify-otp":
 *   post:
 *     tags: [Auth]
 *     summary: "Loggin to system"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - name: phone
 *         description: Set phone number
 *         in: body
 *         required: true
 *         type: string
 *         example: {"phone":"9032271936"}
 *       - name: code
 *         description: Set code sended
 *         in: body
 *         required: true
 *         type: string
 *         example: {"code":"874561"}
 *     responses:
 *       201:
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
 *                example: 201
 *             data:
 *                description: "this field is fix for all success response"
 *                type: object
 *                example: null
 *
 *       400:
 *         description: "RefreshToken is incorrect"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Is Unsuccess
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: "شماره همراه وارد شده اشتباه است"
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 400
 *       500:
 *         description: "internal server (do not send sms to number)"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Unsuccessful
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: "خطای ناشناخته سرور"
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 500
 */
router.post("/verify-otp", authController.verifyOtpCode);

/**
 * @swagger
 * "/user/refresh-token":
 *   post:
 *     tags: [Auth]
 *     summary: "Refresh token system"
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - name: refreshToken
 *         description: Refresh Token for get access token
 *         in: body
 *         required: true
 *         type: string
 *         example: {"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjkwMzIyNzE5MzYiLCJpYXQiOjE2NjE4OTQzNjEsImV4cCI6MTY5MzQ1MTk2MX0.43fQpk32aiI7L4Fuj_JCLaFZLwk1aMUjQtOVfW8O7kM"}
 *
 *     responses:
 *       200:
 *         description: "Get access token with refresh token"
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
 *                example: درخواست شما موفقیت آمیز بود
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 200
 *             data:
 *                description: "this field is fix for all success response"
 *                type: object
 *                example:
 *                 accessToken:
 *                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjkwMzIyNzE5MzYiLCJpYXQiOjE2NjE4OTQzNjEsImV4cCI6MTY5MzQ1MTk2MX0.43fQpk32aiI7L4Fuj_JCLaFZLwk1aMUjQtOVfW8O7kM
 *                 refreshToken:
 *                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjkwMzIyNzE5MzYiLCJpYXQiOjE2NjE4OTQzNjEsImV4cCI6MTY5MzQ1MTk2MX0.43fQpk32aiI7L4Fuj_JCLaFZLwk1aMUjQtOVfW8O7kM
 *
 *
 *       400:
 *         description: "RefreshToken is incorrect"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Is Unsuccess
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: "رفرش توکن  صحیح نیست"
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 400
 *       500:
 *         description: "internal server (do not send sms to number)"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: Unsuccessful
 *               type: boolean
 *               example: false
 *             message:
 *                description: desctption process
 *                type: String
 *                example: "خطای ناشناخته سرور"
 *             status:
 *                description: "status process"
 *                type: Number
 *                example: 500
 */
router.post("/refresh-token", authController.refreshTokent);
module.exports = {
  authRoutes: router,
};
