// backend/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();

// Dummy data to test notifications
const notifications = [
    { id: 1, message: "New Order Placed", read: false },
    { id: 2, message: "Payment Received", read: true },
];

// Get notifications
router.get("/", (req, res) => {
    res.json(notifications);
});

module.exports = router;
