const express = require("express");
const {
  createContact,
  getContacts,
  updateStatus
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.put("/:id/status", updateStatus);

module.exports = router;

