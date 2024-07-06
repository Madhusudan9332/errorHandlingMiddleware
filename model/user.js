const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

module.exports = userModel