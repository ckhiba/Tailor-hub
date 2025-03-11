const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5005;


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// const TailorROutes = require("./routes/TailorRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));


// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // Secure User Routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
