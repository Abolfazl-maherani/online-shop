const authController = require("../controller/user/Auth.controller");
const { adminRoutes } = require("./admin/category.route");
const { publicRoute } = require("./api/public.route");
const { authRoutes } = require("./user/auth");
const router = require("express").Router();

// Public routes
router.use("/", publicRoute);

// User routes
router.use("/user", authRoutes);
// Admin routes
router.use("/admin", adminRoutes);
module.exports = router;
