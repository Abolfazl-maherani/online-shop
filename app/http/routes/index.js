const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("succes");
});
module.exports = router;
