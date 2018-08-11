const router = require("express").Router();
const reservationController = require("../controllers/reservationController");
const { isAuthenticated } = require("../middleware/auth");

//booking room & cancel can only be applied by sign in user
router.get("/", isAuthenticated, reservationController.getAllBooks);
router.post("/add", isAuthenticated, reservationController.booking);
router.put("/edit/:id", isAuthenticated, reservationController.updateBooking);
router.delete(
  "/cancel/:id",
  isAuthenticated,
  reservationController.cancelBooking
);

module.exports = router;
