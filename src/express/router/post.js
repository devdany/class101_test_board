const express = require('express');
const router = express.Router();
const postService = require('../../sequelize/service/PostService');
const logService = require('../../sequelize/service/LogService');
const {update_post_validation} = require('../middleware/input_validation')
const {success, fail} = require('../result_template')

router.get('/all', (req, res) => {
    postService.findAll()
        .then(allPost => {
            res.send(success(null, allPost))
        })
})

router.delete('/:post_id', (req, res) => {
    const {post_id} = req.params;
    postService.delete(post_id)
        .then(() => {
            res.send(success('정상적으로 포스트가 삭제되었습니다.', null))
        })
        .catch(err => {
            logService.createLog({
                model: 'Post',
                detail: JSON.stringify(err)
            })

            res.send(fail('포스트 삭제에 에러가 발생했습니다.'))
        })
})

router.put('/:post_id', update_post_validation, (req, res) => {
    const {post_id} = req.params;
    const {title, content} = req.body;

    postService.update(post_id, {
        title: title,
        content: content
    })
        .then(() => {
            res.send(success('정상적으로 포스트가 수정되었습니다.', null))
        })
        .catch(err => {
            logService.createLog({
                model: 'Post',
                detail: JSON.stringify(err)
            })

            res.send(fail( '포스트 정보 변경에 실패했습니다.'))
        })
})

module.exports = router;