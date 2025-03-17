const Tailor = require("../models/Tailor");

const getTailorProfile = async (req, res) => {
    try {
        const tailor = await Tailor.findOne({ userId: req.params.id });
        if (!tailor) {
            return res.status(404).json({ message: "Tailor not found" });
        }
        res.json(tailor);
    } catch (error) {
        console.error("Error fetching tailor profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getTailorProfile };

// Update Tailor Profile
const updateTailorProfile = async (req, res) => {
    try {
        const tailor = await Tailor.findOne({ userId: req.params.id });
        if (!tailor) {
            return res.status(404).json({ message: "Tailor not found" });
        }

        // Update tailor profile fields
        Object.assign(tailor, req.body);
        await tailor.save();

        res.json(tailor);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { getTailorProfile, updateTailorProfile };
