const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Tailor = require("../models/Tailor");

//  Ensure "uploads/" exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//  Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); //  Make sure "uploads/" folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

//  Separate upload handlers
const uploadProfilePic = multer({ storage }).single("profilePic");
const uploadWorkSample = multer({ storage }).single("workSample");

//  Get Tailor Profile
const getTailorProfile = async (req, res) => {
    try {
        const tailorId = req.params.id;
        console.log("Fetching Tailor ID:", tailorId);

        const tailor = await Tailor.findById(tailorId);
        if (!tailor) {
            console.log("Tailor not found for ID:", tailorId);
            return res.status(404).json({ message: "Tailor not found" });
        }
        res.json(tailor);
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//  Update Tailor Profile (Including Profile Pic)
const updateTailorProfile = async (req, res) => {
    try {
        const tailorId = req.user?.tailorId || req.params.id;
        const { name, email, phone, place, experience, categories } = req.body;
        const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

        // Debugging: Log incoming request body
        console.log('Request Body:', req.body);

        const tailor = await Tailor.findById(tailorId);
        if (!tailor) {
            return res.status(404).json({ message: "Tailor not found!" });
        }

        // Convert experience to a number if it's provided (in case it's passed as a string)
        const updatedExperience = experience ? Number(experience) : tailor.experience;

        //  Update fields
        tailor.name = name || tailor.name;
        tailor.email = email || tailor.email;
        tailor.phone = phone || tailor.phone;
        tailor.place = place || tailor.place;
        tailor.experience = updatedExperience || tailor.experience; // Ensure experience is updated
        tailor.categories = categories ? JSON.parse(categories) : tailor.categories;

        //  Update profilePic if new image uploaded
        if (profilePic) {
            tailor.profilePic = profilePic;
        }

        // Save updated profile
        await tailor.save();
        res.status(200).json({ message: "Profile updated successfully!", tailor });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};



//  Upload Work Sample
const uploadTailorWorkSample = (req, res) => {
    const tailorId = req.params.id;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    Tailor.findById(tailorId)
        .then((tailor) => {
            if (!tailor) {
                return res.status(404).json({ message: "Tailor not found." });
            }

            tailor.workSamples.push(`/uploads/${req.file.filename}`);
            tailor.save()
                .then((updatedTailor) => res.json(updatedTailor))
                .catch((err) => res.status(500).json({ message: "Error saving file.", error: err.message }));
        })
        .catch((err) => res.status(500).json({ message: "Error finding tailor.", error: err.message }));
};

//  Export all handlers
module.exports = {
    getTailorProfile,
    updateTailorProfile,
    uploadTailorWorkSample,
    uploadProfilePic, //  For Profile Picture Upload
    uploadWorkSample, //  For Work Sample Upload
};
