const express = require('express');
const router = express.Router();
const postService = require('../../sequelize/service/PostService');
const logService = require('../../sequelize/service/LogService');

router.get('/all', (req, res) => {
    postService.findAll()
        .then(allPost => {
            res.send(allPost)
        })
})

router.delete('/:post_id', (req, res) => {
    const {post_id} = req.params;
    postService.delete(post_id)
        .then(() => {
            res.send(true)
        })
        .catch(err => {
            logService.createLog({
                model: 'Post',
                detail: JSON.stringify(err)
            })

            res.send(false)
        })
})

router.put('/:post_id', (req, res) => {
    const {post_id} = req.params;
    const {title, content} = req.body;

    if(!title || !content){
        res.send(false);
    }else{
        postService.update(post_id, {
            title: title,
            content: content
        })
            .then(() => {
                res.send(true)
            })
            .catch(err => {
                logService.createLog({
                    model: 'Post',
                    detail: JSON.stringify(err)
                })
                res.send(false)
            })
    }
})

module.exports = router;