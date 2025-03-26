const express = require("express");
const router = express.Router();
const {
    getCustomerProfile,
    updateCustomerProfile,
} = require("../controllers/customerController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// GET Customer Profile
router.get("/profile", authMiddleware, getCustomerProfile);

// UPDATE Customer Profile with Profile Picture
router.put("/profile", authMiddleware, upload.single("profilePic"), updateCustomerProfile);

module.exports = router;
