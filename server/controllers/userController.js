const User = require("../models/User");

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, phone },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile", error });
    }
};
