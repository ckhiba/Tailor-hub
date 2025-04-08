const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    tailorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    measurementMethod: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
    },
    specialInstructions: String,
    deliveryDate: String,
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
