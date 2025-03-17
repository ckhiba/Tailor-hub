const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5005;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tailorRoutes = require("./routes/tailorRoutes");

const app = express();
app.use(express.json());

//  Fix: Ensure the correct frontend URL is allowed
const allowedOrigins = ["http://localhost:5173"]; // Make sure this matches your Vite frontend

//  Fix: Handle CORS properly
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));

//  Fix: Manually handle OPTIONS preflight requests
app.options("*", cors()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tailor", tailorRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
