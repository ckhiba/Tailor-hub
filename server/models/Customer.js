    const mongoose = require("mongoose");

    const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    profilePic: { type: String, default: "" },
    });

    module.exports = mongoose.model("Customer", customerSchema);
