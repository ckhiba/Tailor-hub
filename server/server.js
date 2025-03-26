const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path"); //  Import path


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tailorRoutes = require("./routes/tailorRoutes");
const customerRoutes = require("./routes/customerRoutes");



const appointmentRoutes = require("./routes/appointmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRoutes = require("./routes/orderRoutes");




const app = express();
app.use(express.json());

//  CORS Configuration
const allowedOrigins = ["http://localhost:5173"];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//  Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

//  Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tailor", tailorRoutes);
app.use("/api/customer", customerRoutes); //  Corrected

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //  Corrected path


app.use("/api/notifications", notificationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/appointments", appointmentRoutes);


//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
