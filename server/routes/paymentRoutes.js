const express = require("express");
const {
  createPayment,
  getPayments,
} = require("../controllers/paymentController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(), getPayments);
router.post("/", auth(), createPayment);

module.exports = router;
