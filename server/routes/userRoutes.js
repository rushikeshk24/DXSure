const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth(["admin"]), getUsers);
router.post("/", auth(["admin"]), createUser);

module.exports = router;
