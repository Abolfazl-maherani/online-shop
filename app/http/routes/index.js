const authController = require("../controller/user/auth.controller");
const { publicRoute } = require("./api/public.route");
const { authRoutes } = require("./user/auth");
const router = require("express").Router();

// Public routes
router.use("/", publicRoute);

// User routes
router.use("/user", authRoutes);
// Admin routes
router.use("/admin", (req, res, next) => {});
module.exports = router;
