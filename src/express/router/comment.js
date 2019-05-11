const express = require('express');
const router = express.Router();
const commentService = require('../../sequelize/service/CommentService');
const postService = require('../../sequelize/service/PostService');
const userService = require('../../sequelize/service/UserService');
const logService = require('../../sequelize/service/LogService');

router.get('/:current_page/:limit', async (req, res) => {
    const {current_page, limit} = req.params;
    const start = (current_page-1)*limit;

    const comments = await Promise.resolve(commentService.findPaging(start, Number(limit)));

    res.send({result: true, data: {comments: comments}})
})

router.post('/', async (req, res) => {
    const {userId, post_id, content} = req.body;

    if(!userId || !content){
        res.send({result: false, detail: '작성자와 내용을 모두 입력해주세요'})
    }else{
        const writer = await Promise.resolve(userService.findByUserId(userId));

        if(!writer){
            res.send({result: false, detail: '해당 유저가 존재하지 않습니다.'});
        }else{
            const post = await Promise.resolve(postService.isExistPost(post_id));

            if(!post){
                res.send({result: false, detail: '해당 포스팅이 존재하지 않습니다.'});
            }else{
                commentService.writeComment({
                    writer:writer.dataValues.id,
                    post: post_id,
                    content: content,
                    is_delete: false
                })
                    .then(comment => {
                        res.send({result: true, data: comment.dataValues})
                    })
                    .catch(err => {
                        logService.createLog({
                            model: 'Comment',
                            detail: JSON.stringify(err)
                        })
                        res.send({result: false, detail:'코멘트 저장에 에러가 발생했습니다.'})
                    })
            }
        }
    }
})

router.put('/:comment_id', (req, res) => {
    const {content} = req.body;
    const {comment_id} = req.params;

    if(!content){
        res.send({result:false, detail: '내용을 입력해주세요.'})
    }else{
        commentService.update(comment_id,{
            content: content
        })
            .then(() => {
                res.send({result: true, data: null})
            })
            .catch(err => {
                logService.createLog({
                    model: 'Comment',
                    detail: JSON.stringify(err)
                })

                res.send({result: false, detail: '코멘트 수정에 에러가 발생했습니다.'})
            })
    }
})

router.delete('/:comment_id', (req, res) => {
    const {comment_id} = req.params;

    commentService.delete(comment_id)
        .then(() => {
            res.send({result: true, data: null})
        })
        .catch(err => {
            logService.createLog({
                model: 'Comment',
                detail: JSON.stringify(err)
            })

            res.send({result: false, detail:'코멘트 삭제에 에러가 발생했습니다.'})
        })
})



module.exports = router;