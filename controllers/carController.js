const Modals = require("../Models/index");
const bcrypt = require("bcrypt")
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();


const fs = require('fs');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id

            }, {
                resource_type: "auto",
                folder: folder
            })
        })
    })
}
module.exports = {

    addCar: async (req, res) => {
        const { userId, car_model, price, phone, city } = req.body;
        const uploader = async (path) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(path, (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                });
            });
        };

        try {
            const urls = [];
            const files = req.files;
            console.log(`files at be`, files);

            if (files && files.length > 0) {
                for (const file of files) {
                    const { path } = file;
                    const newPath = await uploader(path);
                    urls.push(newPath);
                    fs.unlinkSync(path);
                }
            }


            const newCar = new Modals.car({
                userId,
                car_model,
                price,
                phone,
                city,
                pictures: urls,
            });

            await newCar.save();
            res.status(201).json(newCar);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

}
