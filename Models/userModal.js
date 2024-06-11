const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'password is required.'],
        }
    }
)


//const schemaModal = mongoose.model('user', schema);

module.exports = mongoose.model('user', schema);
