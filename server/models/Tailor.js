const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  place: { type: String },
  profileImage: { type: String },
  categories: { type: [String], default: [] },
  workSamples: { type: [String], default: [] },
});

module.exports = mongoose.model("Tailor", tailorSchema);
