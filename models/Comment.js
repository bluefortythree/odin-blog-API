const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        minlength: 10
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    edited_at: {
        type: Date,
    },
    post: {
        type: String
    }
})

module.exports = mongoose.model('Comment', CommentSchema)