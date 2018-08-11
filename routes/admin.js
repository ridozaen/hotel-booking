const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { isAuthorized } = require("../middleware/auth");

router.get("/", isAuthorized, adminController.getUsers);
router.get("/:id", isAuthorized, adminController.getUserById);
router.post("/register", isAuthorized, adminController.createAdmin);
router.post("/signin", adminController.signInAdmin);
router.delete("/delete/:id", isAuthorized, adminController.deleteUserById);

module.exports = router;
