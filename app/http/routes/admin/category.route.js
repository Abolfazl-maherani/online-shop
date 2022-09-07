const category = require("../../controller/admin/Category.controller");

const router = require("express").Router();
//TODO: Chack all logins and primision for access to routes
router.get("/", category.getAllCategory);
router.post("/", category.createCategory);
router.get("/parents", category.getAllParents);
router.get("/children/:parentId", category.getAllChildrenInParent);
router.delete("/:categoryId", category.deleteCategory);
router.get("/:categoryId", category.getCategoryById);

module.exports = {
  categoriesRoute: router,
};
