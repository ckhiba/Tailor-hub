const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tailor = require("../models/Tailor");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log(" Decoded Token:", decoded);

            req.user = await User.findById(decoded.id).select("-password");
            if (decoded.role === "tailor" && decoded.tailorId) {
                req.tailor = await Tailor.findById(decoded.tailorId);
            }

            next();
        } catch (error) {
            console.error(" Token Verification Error:", error);
            res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        res.status(401).json({ message: "No token found" });
    }
};

module.exports = protect;
