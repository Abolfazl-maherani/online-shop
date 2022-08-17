const { publicRoute } = require("./api/public.route");
const router = require("express").Router();

// Public routes
router.use("/", publicRoute);

// User routes
router.use("/user", (req, res, next) => {});
// Admin routes
router.use("/admin", (req, res, next) => {});
module.exports = router;
