const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { isAuthorized } = require("../middleware/auth");

router.post("/signup", isAuthorized, adminController.createAdmin);
router.post("/signin", adminController.signInAdmin);

module.exports = router;
