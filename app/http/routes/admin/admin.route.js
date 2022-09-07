const { categoriesRoute } = require("./category.route");

const router = require("express").Router();
router.use("/categories", categoriesRoute);
module.exports = {
  adminRoutes: router,
};
