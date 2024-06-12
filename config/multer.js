const multer = require("multer");
const path = require('path');
const DIR = path.join(__dirname, '../uploads');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
/* 
Using uploads directory for the storage configuration of the files 
received by multer,
*/
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR)
//     },

// });
const storage = multer.memoryStorage();

//const storage = multer.memoryStorage();

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'uploads', // specify the folder in Cloudinary where you want to store the images
//         format: async (req, file) => 'png', // supports promises as well
//         public_id: (req, file) => Date.now().toString() + '-' + file.originalname, // use a unique identifier for each file
//     },
// });


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