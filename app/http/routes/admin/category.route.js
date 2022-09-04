const category = require("../../controller/admin/Category.controller");

const router = require("express").Router();
//TODO: Chack all logins and primision for access to routes
router.get("/categories/all", category.getAllCategory);
router.post("/categories/create", category.createCategory);
router.delete("/categories/delete", category.deleteCategory);
module.exports = {
  adminRoutes: router,
};
