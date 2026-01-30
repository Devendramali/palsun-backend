const express = require("express");
const {updatelinks, deleteLinks, createImplink, getLinks, toggleimpLinks} = require("../controllers/implinkController");


const router = express.Router();
router.get("/", getLinks);
router.post("/", createImplink);
router.delete("/:id", deleteLinks);
router.put("/:id",updatelinks);
router.put("/toggle/:id", toggleimpLinks);

module.exports = router;