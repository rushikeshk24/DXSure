const express = require("express");
const { getRecords } = require("../controllers/recordController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(["admin"]), getRecords);

module.exports = router;
