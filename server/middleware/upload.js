const multer = require("multer");
const path = require("path");

//  Set storage engine
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//  File validation (image only)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
        cb(null, true);
    } else {
        cb("Error: Images only (jpeg, jpg, png)!");
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    fileFilter,
});

module.exports = upload;
