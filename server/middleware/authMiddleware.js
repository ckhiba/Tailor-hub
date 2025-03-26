const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Check if token is provided and properly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Access denied. Token is empty or invalid." });
    }

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired. Please login again." });
        } else {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
    }
};

module.exports = authMiddleware;


