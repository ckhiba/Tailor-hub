const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/book", appointmentController.bookAppointment);
router.get("/", appointmentController.getAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.put("/:id", appointmentController.updateStatus);

module.exports = router;
