const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Example route: Get user profile
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "User profile data", user: req.user });
});

module.exports = router;
