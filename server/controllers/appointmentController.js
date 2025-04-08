const Appointment = require("../models/Appointment");
const User = require("../models/User"); // Assuming you store tailor/customer info here
const sendEmail = require("../utils/sendEmail"); // Utility for sending emails

// Book appointment
exports.bookAppointment = async (req, res) => {
    try {
        const {
            tailorId,
            customerId,
            date,
            measurementMethod,
            specialInstructions,
            deliveryDate,
        } = req.body;

        const newAppointment = new Appointment({
            tailorId,
            customerId,
            date,
            measurementMethod,
            specialInstructions,
            deliveryDate,
            status: "Pending",
        });

        await newAppointment.save();

        // Optional: send emails
        let emailStatus = {};

        try {
            const tailor = await User.findById(tailorId);
            const customer = await User.findById(customerId);

            await sendEmail({
                to: tailor.email,
                subject: "New Appointment Request",
                text: `You have a new appointment request from ${customer.name} on ${date}.`,
            });

            await sendEmail({
                to: customer.email,
                subject: "Appointment Request Sent",
                text: `Your appointment request to ${tailor.name} for ${date} was sent.`,
            });

            emailStatus = { tailor: true, customer: true };
        } catch (err) {
            emailStatus = { tailor: false, customer: false };
        }

        res.status(201).json({ success: true, appointment: newAppointment, emailStatus });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to book appointment", error: err.message });
    }
};

// Get all appointments (optionally filter by tailorId or customerId)
exports.getAppointments = async (req, res) => {
    try {
        const { tailorId, customerId } = req.query;
        let filter = {};

        if (tailorId) filter.tailorId = tailorId;
        if (customerId) filter.customerId = customerId;

        const appointments = await Appointment.find(filter).sort({ date: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointments", error: err.message });
    }
};

// Update status
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ success: true, appointment });
    } catch (err) {
        res.status(500).json({ message: "Error updating appointment", error: err.message });
    }
};

// Get single appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointment", error: err.message });
    }
};
