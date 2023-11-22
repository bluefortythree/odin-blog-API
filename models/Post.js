const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    body: {
        type: String,
        required: true,
        minlength: 1
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }, 
    edited_at: {
        type: Date,
    },
    published: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Post', PostSchema)