const express = require("express");
const { getSummary } = require("../controllers/dashboardController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", auth(), getSummary);

module.exports = router;
