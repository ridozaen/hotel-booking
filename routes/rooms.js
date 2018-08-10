const router = require("express").Router();
const roomController = require("../controllers/roomsController");
const upload = require("../helpers/upload");
const { isAuthorized } = require("../middleware/auth");

router.get("/", isAuthorized, roomController.findAll);
router.post(
  "/add",
  isAuthorized,
  upload.multer.single("image"),
  upload.sendUploadToGCS,
  roomController.createRooms
);

module.exports = router;
