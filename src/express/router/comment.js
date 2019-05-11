const express = require('express');
const router = express.Router();
const commentService = require('../../sequelize/service/CommentService');
const logService = require('../../sequelize/service/LogService');
const {
    write_comment_validation,
    find_comment_writer,
    is_comment_post,
    update_comment_validation
} = require('../middleware/input_validation');
const {success, fail} = require('../result_template')

router.get('/:current_page/:limit', async (req, res) => {
    const {current_page, limit} = req.params;
    const start = (current_page - 1) * limit;

    const comments = await Promise.resolve(commentService.findPaging(start, Number(limit)));


    res.send(success(null, comments))
})

router.post('/', write_comment_validation, find_comment_writer, is_comment_post, async (req, res) => {
    const {post_id, content} = req.body;

    const writer = req.writer;

    commentService.writeComment({
        writer: writer.dataValues.id,
        post: post_id,
        content: content,
        is_delete: false
    })
        .then(comment => {
            res.send(success('정상적으로 코멘트가 등록되었습니다.', comment.dataValues))
        })
        .catch(err => {
            logService.createLog({
                model: 'Comment',
                detail: JSON.stringify(err)
            })
            res.send(fail('코멘트 저장에 에러가 발생했습니다.'));
        })


})

router.put('/:comment_id', update_comment_validation, (req, res) => {
    const {content} = req.body;
    const {comment_id} = req.params;

    commentService.update(comment_id, {
        content: content
    })
        .then(() => {
            res.send(success('정상적으로 코멘트가 수정되었습니다.', null))
        })
        .catch(err => {
            logService.createLog({
                model: 'Comment',
                detail: JSON.stringify(err)
            })

            res.send(fail('코멘트 수정에 에러가 발생했습니다.'))
        })

})

router.delete('/:comment_id', (req, res) => {
    const {comment_id} = req.params;

    commentService.delete(comment_id)
        .then(() => {
            res.send(success('정상적으로 코멘트가 삭제되었습니다.', null))
        })
        .catch(err => {
            logService.createLog({
                model: 'Comment',
                detail: JSON.stringify(err)
            })

            res.send(fail('코멘트 삭제에 에러가 발생했습니다.'))
        })
})


module.exports = router;