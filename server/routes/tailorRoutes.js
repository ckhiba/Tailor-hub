const express = require("express");
const {
    getTailorProfile,
    updateTailorProfile,
    uploadTailorWorkSample,
    uploadProfilePic,
    uploadWorkSample,
    removeWorkSample,
    getTailorsByCategory,
    getTailorProfileById,
} = require("../controllers/tailorController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//  Get Tailor Profile
router.get("/profile/:id", authMiddleware, getTailorProfile);

//  Update Tailor Profile (Including Profile Pic)
router.put("/update-profile", authMiddleware, uploadProfilePic, updateTailorProfile);

//  Upload Work Sample
router.post("/upload-work/:id", authMiddleware, uploadWorkSample, uploadTailorWorkSample);

router.delete("/remove-work/:id/:filename", authMiddleware, removeWorkSample);

// Get Tailors by Category
router.get("/category/:category", getTailorsByCategory);


// Get Tailor Profile by ID
router.get("/profile/:id", getTailorProfileById);





module.exports = router;
