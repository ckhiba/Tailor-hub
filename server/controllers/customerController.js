const Customer = require("../models/Customer");
const path = require("path");

// GET Customer Profile
exports.getCustomerProfile = async (req, res) => {
    try {
        const customer = await Customer.findOne({ userId: req.user.userId });
        if (!customer) {
            return res.status(404).json({ message: "Customer profile not found" });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// UPDATE Customer Profile with Image Upload
exports.updateCustomerProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        let profilePic = req.body.profilePic;

        // ✅ Check if file is uploaded
        if (req.file) {
            profilePic = `uploads/${req.file.filename}`;
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { userId: req.user.userId },
            { name, phone, address, profilePic },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};
