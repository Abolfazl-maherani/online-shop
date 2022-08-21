const publicController = require("../../controller/api/public.controller");
const router = require("express").Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags: [public]
 *     summary: index
 *     description: Get information for api
 *     responses:
 *       200:
 *         description: Return name Api and version
 *       404:
 *         description: Returns an error object key in json
 */
router.get("/", publicController.indexController);

module.exports = { publicRoute: router };
