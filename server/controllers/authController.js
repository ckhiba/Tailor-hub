const User = require("../models/User");
const Tailor = require("../models/Tailor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        //  Check if the user already exists by email OR phone
        let existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        //  Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create and save new user
        const newUser = new User({ name, email, phone, password: hashedPassword, role });
        await newUser.save();

        //  If role is "tailor", create a tailor profile
        if (role === "tailor") {
            const newTailor = new Tailor({
                userId: newUser._id,  // Associate the User ID
                name,
                email,
                phone,
                place: "",
                categories: [],
                workSamples: []
            });
        
            await newTailor.save();
            console.log("Tailor profile created:", newTailor);
        }
        

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Registration Error:", error);  // ✅ Logs full error in the backend
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        console.log("🔹 Login Attempt:", { phone, password });

        const user = await User.findOne({ phone });
        if (!user) {
            console.log(" User not found");
            return res.status(400).json({ message: "Invalid phone or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(" Incorrect password");
            return res.status(400).json({ message: "Invalid phone or password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log(" Login Successful:", user);
        res.json({ token, user });
    } catch (error) {
        console.error(" Server Error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}