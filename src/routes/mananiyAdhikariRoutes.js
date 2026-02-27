const router = require("express").Router();
const controller = require("../controllers/mananiyAdhikariController");
const upload = require("../middleware/upload");

router.get("/", controller.getAll);
router.post("/", upload.single("image"), controller.create);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", controller.remove);
router.put("/toggle/:id", controller.toggleStatus);

module.exports = router;