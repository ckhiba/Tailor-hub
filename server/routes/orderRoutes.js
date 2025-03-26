// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();

// Dummy data for testing orders
const orders = [
    { id: 1, status: "Pending", seen: false },
    { id: 2, status: "Delivered", seen: true },
];

// Get orders
router.get("/", (req, res) => {
    res.json(orders);
});

module.exports = router;
