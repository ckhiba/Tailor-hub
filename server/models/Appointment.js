const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    tailorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tailor",
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    instructions: {
        type: String, // Customer's custom instructions
        default: "",
    },
    measurements: {
        type: Map,
        of: String, // Store as key-value pairs
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
