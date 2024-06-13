const multer = require("multer");
const path = require('path');
const DIR = path.join(__dirname, '../uploads');
const cloudinary = require('cloudinary').v2;
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jepg" || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        //reject file 
        cb({ message: "Unsupported file format" }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})

module.exports = upload;