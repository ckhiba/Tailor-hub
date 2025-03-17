const express = require("express");
const { getTailorProfile, updateTailorProfile } = require("../controllers/tailorController"); 
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile/:id", getTailorProfile);
router.put("/profile/:id", updateTailorProfile);

module.exports = router;
