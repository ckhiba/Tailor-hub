const Appointment = require("../models/Appointment");

// Book an Appointment with Instructions and Measurements
exports.bookAppointment = async (req, res) => {
    try {
        const { tailorId, date, instructions, measurements } = req.body;
        const customerId = req.user.id;

        // Check if an appointment already exists
        const existingAppointment = await Appointment.findOne({
            tailorId,
            date,
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment already booked for this date.",
            });
        }

        // Create new appointment
        const newAppointment = new Appointment({
            tailorId,
            customerId,
            date,
            instructions,
            measurements,
        });

        await newAppointment.save();
        res.status(201).json({
            success: true,
            message: "Appointment booked successfully!",
        });
    } catch (error) {
        console.error("Error booking appointment:", error.message);
        res.status(500).json({
            success: false,
            message: "Error booking appointment.",
        });
    }
};
