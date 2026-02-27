const express = require("express");
const {
  getEvents,
  createEvent,
  deleteEvent,
  toggleevent
} = require("../controllers/eventController");

const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getEvents);
router.post("/", upload.single("image"), createEvent);
router.delete("/:id", deleteEvent);
router.put("/toggle/:id", toggleevent);

module.exports = router;

