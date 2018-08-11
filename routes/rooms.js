const router = require("express").Router();
const roomController = require("../controllers/roomsController");
const upload = require("../helpers/upload");
const { isAuthorized } = require("../middleware/auth");

router.get("/", roomController.findAll);
router.get("/avail", roomController.findAvailRoom);
router.get("/:id", roomController.findById);
router.post(
  "/add",
  isAuthorized,
  upload.multer.single("image"),
  upload.sendUploadToGCS,
  roomController.createRoom
);
router.put(
  "/update/:id",
  isAuthorized,
  upload.multer.single("image"),
  upload.sendUploadToGCS,
  roomController.updateRoom
);
router.delete("/delete/:id", isAuthorized, roomController.deleteRoom);

module.exports = router;
