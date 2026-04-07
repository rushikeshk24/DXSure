const express = require("express");
const { createTicket, getTickets } = require("../controllers/ticketController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(), getTickets);
router.post("/", auth(["admin"]), createTicket);

module.exports = router;
