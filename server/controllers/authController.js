const User = require("../models/User");
const Tailor = require("../models/Tailor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); //  Import mongoose

//  REGISTER USER
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        //  Check if the user already exists (by email OR phone)
        let existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        //  Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create and save new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
        });
        await newUser.save();

        //  If role is "tailor", create a tailor profile
        if (role === "tailor") {
            const newTailor = new Tailor({
                userId: new mongoose.Types.ObjectId(newUser._id), //  Associate userId correctly
                name,
                email,
                phone,
                profilePic: "",
                experience: 0,
                categories: [],
                workSamples: [],
            });
        
            await newTailor.save();
            console.log("Tailor profile created:", newTailor);
        }

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
    }
};

//  LOGIN USER
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        console.log("Login Attempt");

        //  Check if user exists
        const user = await User.findOne({ phone });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid phone or password" });
        }

        //  Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password");
            return res.status(400).json({ message: "Invalid phone or password" });
        }

        //  Check if the user is a tailor and fetch tailorId
        let tailorId = null;
        if (user.role === "tailor") {
            const tailor = await Tailor.findOne({ userId: new mongoose.Types.ObjectId(user._id) });

            if (tailor) {
                tailorId = tailor._id;
                // console.log("Fetched Tailor ID:", tailorId);
            } else {
                console.log("Tailor profile not found");
                // console.log("Tailor profile not found for ID:", user._id);
            }
        }

        //  Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, role: user.role, tailorId }, // Include tailorId
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // console.log("Login Successful:", { userId: user._id, role: user.role, tailorId });

        //  Return token and user data
        res.json({ token, user, tailorId });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};