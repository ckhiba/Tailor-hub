// models/Tailor.js
const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, default: "" },
    experience: { type: Number, default: 0 },
    categories: { type: [String], default: [] },
    services: { type: [String], default: [] },
    workSamples: { type: [String], default: [] },
    profilePic: { type: String, default: "" },
});

module.exports = mongoose.model("Tailor", tailorSchema);
