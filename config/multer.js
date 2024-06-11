const multer = require("multer");
const path = require('path');
const DIR = path.join(__dirname, '../uploads');

/* 
Using uploads directory for the storage configuration of the files 
received by multer,
*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },

});

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