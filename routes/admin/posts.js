const express = require('express')
const router = express.Router()
const {getAllPostsAdmin, getPostAdmin, submitPost, publishPost, editPostPost, editPostGet, getAllComments, deleteCommentPost, deleteCommentGet} = require('../../controllers/blog')

router.route('/').get(getAllPostsAdmin)

router.route('/new').post(submitPost).get((req, res) => {
    res.render('../views/admin/new-post')
})

router.route('/:id').post(publishPost).get(getPostAdmin)

router.route('/:id/edit').post(editPostPost).get(editPostGet)

router.route('/:id/comments').get(getAllComments)

router.route('/:postId/comments/:commentId').post(deleteCommentPost).get(deleteCommentGet)

module.exports = router