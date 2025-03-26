const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

// Route: POST /api/appointments/book
router.post("/book", protect, bookAppointment);

module.exports = router;
