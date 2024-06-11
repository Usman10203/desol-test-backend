const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');


const schema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            default: "66670be4046816c69510979b",
            ref: "user",
        },
        car_model: {
            type: String,
            required: [true, 'Model is required.'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required.'],
        },
        phone: {
            type: Number,
            required: [true, 'Phone is required.'],
        },
        city: {
            type: String,
            required: [true, 'City is required.'],
        },
        pictures: {
            type: [String],
            default: [],
        }
    }
)

module.exports = mongoose.model('car', schema);
