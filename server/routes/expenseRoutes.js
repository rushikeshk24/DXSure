const express = require("express");
const {
  createExpense,
  getExpenses,
} = require("../controllers/expenseController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(), getExpenses);
router.post("/", auth(), createExpense);

module.exports = router;
