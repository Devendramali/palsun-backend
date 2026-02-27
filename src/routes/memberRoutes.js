const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/memberController");

router.post("/", upload.single("image"), controller.createMember);
router.get("/", controller.getMembers);
router.put("/:id", upload.single("image"), controller.updateMember);
router.delete("/:id", controller.deleteMember);
router.patch("/:id/toggle", controller.toggleMemberStatus);

module.exports = router;
