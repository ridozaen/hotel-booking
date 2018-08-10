const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Home Page API Hotel Booking...");
});

module.exports = router;
