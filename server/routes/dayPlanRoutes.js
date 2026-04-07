const express = require("express");
const {
  createDayPlan,
  getDayPlans,
} = require("../controllers/dayPlanController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(), getDayPlans);
router.post("/", auth(), createDayPlan);

module.exports = router;
