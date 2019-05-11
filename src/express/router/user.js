const express = require('express');
const router = express.Router();
const commentService = require('../../sequelize/service/CommentService');
const postService = require('../../sequelize/service/PostService');

router.get('/:user_id/comments', (req, res) => {
    commentService.findByUserId(req.params.user_id)
        .then(comments => {
            res.send({result: true, data: comments})
        })
})

router.get('/:user_id/posts', (req, res) => {
    postService.findByUserId(req.params.user_id)
        .then(posts => {
            res.send({result: true, data: posts})
        })
})

module.exports = router;