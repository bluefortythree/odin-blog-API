const Post = require('../models/Post')
const Comment = require('../models/Comment')
const {StatusCodes} = require('http-status-codes')

const getAllPostsSite = async(req, res) => {
    const posts = await Post.find({published: true})
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })
    res.render('../views/site/posts', {posts, f})
}

const getAllPostsAdmin = async(req, res) => {
    const posts = await Post.find({})
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })
    res.render('../views/admin/posts', {posts, f})
}

const getPostSite = async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({_id: id})
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })
    res.render('../views/site/single-post', {post, f})
}

const getPostAdmin = async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({_id: id})
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })
    res.render('../views/admin/single-post', {post, f})
}

const submitPost = async(req, res) => {
    const {author, title, body} = req.body
    const titleExists = await Post.findOne({title})
    const bodyExists = await Post.findOne({body})
    if(!author || !title || !body) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide author, title, and body.'})
    } else if (titleExists) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Another post with the same title already exists.'})
    } else if (bodyExists) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Another post with the same body already exists.'})
    } else {
        const post = await Post.create({author, title, body, created_at: new Date()})
        res.status(StatusCodes.CREATED).json({title, body})
    }
}

const publishPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({_id: id})
    if (!post.published) {
        await Post.updateOne({_id: id}, {published: true}, {new: true})
        res.status(StatusCodes.OK).json({message: 'Your post was published successfully.'})
    } else {
        await Post.updateOne({_id: id}, {published: false}, {new: true})
        res.status(StatusCodes.OK).json({message: 'Your post was unpublished successfully.'})
    }
}

const editPostPost = async(req, res) => {
    const id = req.params.id
    const {author, title, body} = req.body
    const post = await Post.findOneAndUpdate({_id: id}, {author, title, body}, {new: true})
    res.redirect(`/posts/${post.id}`)
}

const editPostGet = async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({_id: id})
    res.render('../views/admin/edit-post', {post})
}

const getAllComments = async(req, res) => {
    const id = req.params.id
    const comments = await Comment.find({post: id})
    const post = await Post.findOne({_id: id})
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })
    res.render('../views/site/comments', {comments, post, f})
}

const submitComment = async(req, res) => {
    const id = req.params.id
    const {author, body} = req.body
    if(!author || !body) {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide author, title, and body.'})
    } else {
        const comment = await Comment.create({author, body, created_at: new Date(), post: id})
        res.status(StatusCodes.CREATED).json({author, body, comment})
    }
}

const deleteCommentPost = async(req, res) => {
    const postId = req.params.postId
    const commentId = req.params.commentId
    const comment = await Comment.findOneAndDelete({_id: commentId})
    res.redirect(`/posts/${postId}/comments`)
}

const deleteCommentGet = async(req, res) => {
    const commentId = req.params.commentId
    const comment = await Comment.findOne({_id: commentId})
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })
    res.render('../views/admin/delete-comment', {comment, f})
}

module.exports = {getAllPostsSite, getAllPostsAdmin, getPostSite, getPostAdmin, submitPost, publishPost, editPostPost, editPostGet, getAllComments, submitComment, deleteCommentPost, deleteCommentGet}