const publicController = require("../../controller/api/public.controller");
const router = require("express").Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags: [public]
 *     summary: index
 *     description: get all required data
 *     responses:
 *       200:
 *         description: Returns response in a json
 *       404:
 *         description: Returns an error object key in json
 */
router.get("/", publicController.indexController);

module.exports = { publicRoute: router };
