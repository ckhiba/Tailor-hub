// models/Tailor.js
const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //  Correct
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    place: { type: String, default: "" },
    experience: { type: Number, default: 0 }, //  Add experience field as a number
    categories: { type: [String], default: [] },
    workSamples: { type: [String], default: [] },
    profilePic: { type: String, default: "" }, // Add profilePic to store image URL
});

module.exports = mongoose.model("Tailor", tailorSchema);
