const express = require('express')
const router = express.Router()
const {getAllPostsSite, getPostSite, getAllComments, submitComment} = require('../../controllers/blog')

router.route('/').get(getAllPostsSite)

router.route('/:id').get(getPostSite)

router.route('/:id/comments').get(getAllComments)

router.route('/:id/comments/new').post(submitComment).get((req, res) => {
    res.render('../views/site/new-comment')
})

module.exports = router