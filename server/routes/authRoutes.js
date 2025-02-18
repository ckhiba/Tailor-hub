const express = require("express");
const { login, register } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "User profile", user: req.user });
});

module.exports = router;
