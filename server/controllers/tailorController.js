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
        cb(null, path.join(__dirname, "../uploads")); // Correct absolute path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


//  Upload Handlers

const uploadProfilePic = multer({ storage }).single("profilePic");
const uploadWorkSample = multer({ storage }).single("workSample");


//  Get Tailor Profile by ID

const getTailorProfile = async (req, res) => {
    try {
        const tailorId = req.params.id;
        // console.log("Fetching Tailor ID:", tailorId);

        const tailor = await Tailor.findById(tailorId);
        if (!tailor) {
            // console.log("Tailor not found for ID:", tailorId);
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
        const { name, phone, email, location, experience, categories, services } = req.body;

        const updatedProfile = {
            name,
            phone,
            email,
            location,
            experience,
            categories: JSON.parse(categories),
            services: JSON.parse(services),
        };

        // Handle profile pic upload
        if (req.file) {
            updatedProfile.profilePic = `/uploads/${req.file.filename}`;
        }

        const tailor = await Tailor.findByIdAndUpdate(tailorId, updatedProfile, { new: true });

        if (!tailor) {
            return res.status(404).json({ message: "Tailor not found" });
        }

        res.json({ tailor });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
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


//  Remove Work Sample

const removeWorkSample = async (req, res) => {
    try {
        const { id, filename } = req.params;
        // console.log("Removing work sample:", filename, "for Tailor ID:", id);

        const tailor = await Tailor.findById(id);
        if (!tailor) {
            return res.status(404).json({ message: "Tailor not found!" });
        }

        // Check if the work sample exists in the profile
        const sampleIndex = tailor.workSamples.findIndex((sample) => sample.includes(filename));

        if (sampleIndex === -1) {
            return res.status(404).json({ message: "Work sample not found!" });
        }

        // Remove work sample from the array
        tailor.workSamples.splice(sampleIndex, 1);

        // Delete the file from the 'uploads' folder
        const filePath = path.join(__dirname, "../uploads", filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Deleted file:", filePath);
        } else {
            console.log("File not found:", filePath);
        }

        // Save updated tailor profile
        await tailor.save();
        res.status(200).json({ message: "Work sample removed successfully!", tailor });
    } catch (error) {
        console.error("Error deleting work sample:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//  Get Tailors by Category

const getTailorsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const tailors = await Tailor.find({ categories: category });

        if (!tailors || tailors.length === 0) {
            return res.status(404).json({ message: `No tailors found for ${category}` });
        }

        res.json(tailors);
    } catch (error) {
        console.error("Error fetching tailors:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Get Tailor Profile by ID

const getTailorProfileById = async (req, res) => {
    const { id } = req.params;

    try {
        const tailor = await Tailor.findById(id);

        if (!tailor) {
            return res.status(404).json({ message: "Tailor not found" });
        }

        res.status(200).json(tailor);
    } catch (error) {
        console.error(`Error fetching tailor with ID: ${id}`, error.message);
        res.status(500).json({
            message: "Error fetching tailor profile",
            error: error.message,
        });
    }
};


//  Export All Handlers

module.exports = {
    getTailorProfile,
    updateTailorProfile,
    uploadTailorWorkSample,
    uploadProfilePic,
    uploadWorkSample,
    removeWorkSample,
    getTailorsByCategory,
    getTailorProfileById,
};
