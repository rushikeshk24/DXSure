const express = require("express");
const { createVendor, getVendors } = require("../controllers/vendorController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(), getVendors);
router.post("/", auth(), createVendor);

module.exports = router;
