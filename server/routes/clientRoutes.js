const express = require("express");
const {
  createClient,
  getClients,
  updateClient,
} = require("../controllers/clientController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(), getClients);
router.post("/", auth(), createClient);
router.put("/:id", auth(), updateClient);

module.exports = router;
