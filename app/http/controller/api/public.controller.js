const { redisClient } = require("../../../server");
const Controller = require("../Controller");

module.exports = new (class PublicController extends Controller {
  async indexController(req, res, next) {
    try {
      res.json({
        title: "Online shop",
        version: "1.0",
        description: "The online shop runned on the Node js and express",
      });
    } catch (error) {
      next(error);
    }
  }
})();
