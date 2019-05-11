const express = require('express');
const router = express.Router();
const postService = require('../../sequelize/service/PostService');
const logService = require('../../sequelize/service/LogService');

router.get('/all', (req, res) => {
    postService.findAll()
        .then(allPost => {
            res.send({result: true, data: allPost})
        })
})

router.delete('/:post_id', (req, res) => {
    const {post_id} = req.params;
    postService.delete(post_id)
        .then(() => {
            res.send({result: true, data: null})
        })
        .catch(err => {
            logService.createLog({
                model: 'Post',
                detail: JSON.stringify(err)
            })

            res.send({result: false, detail:'포스트 삭제에 에러가 발생했습니다.'})
        })
})

router.put('/:post_id', (req, res) => {
    const {post_id} = req.params;
    const {title, content} = req.body;

    if(!title || !content){
        res.send({result: false, detail: '제목과 내용을 모두 입력해주세요.'});
    }else{
        postService.update(post_id, {
            title: title,
            content: content
        })
            .then(() => {
                res.send({result: true, data: null})
            })
            .catch(err => {
                logService.createLog({
                    model: 'Post',
                    detail: JSON.stringify(err)
                })

                res.send({result: false, detail: '포스트 정보 변경에 실패했습니다.'})
            })
    }
})

module.exports = router;