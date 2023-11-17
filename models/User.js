const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        minlength: 6,
        maxlength: 20,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6,
    }
})

module.exports = mongoose.model('User', UserSchema)