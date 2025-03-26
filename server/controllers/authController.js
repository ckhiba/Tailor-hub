const User = require("../models/User");
const Tailor = require("../models/Tailor");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//  REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Create respective profile based on role
    if (role === "tailor") {
      const newTailor = new Tailor({
        userId: new mongoose.Types.ObjectId(newUser._id),
        name,
        email,
        phone,
        profilePic: "",
        experience: 0,
        categories: [],
        workSamples: [],
      });

      await newTailor.save();
    } else if (role === "customer") {
      const newCustomer = new Customer({
        userId: new mongoose.Types.ObjectId(newUser._id),
        name,
        email,
        phone,
        address: "",
        profilePic: "",
      });

      await newCustomer.save();
    }

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

//  LOGIN USER
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "Invalid phone or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid phone or password" });
    }

    // Check for tailor or customer profile
    let tailorId = null;
    let customerId = null;

    if (user.role === "tailor") {
      const tailor = await Tailor.findOne({ userId: user._id });
      tailorId = tailor ? tailor._id : null;
    } else if (user.role === "customer") {
      const customer = await Customer.findOne({ userId: user._id });
      customerId = customer ? customer._id : null;
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role, tailorId, customerId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user, tailorId, customerId });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
