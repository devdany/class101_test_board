const userService = require('../../sequelize/service/UserService');
const postService = require('../../sequelize/service/PostService');

module.exports = {
    update_post_validation: (req, res, next) => {
        const {title, content} = req.body;
        if(!title || !content){
            res.send({result: false, detail: '제목과 내용을 모두 입력해주세요.'});
        }else{
            next();
        }
    },
    write_comment_validation: (req, res, next) => {
        const {userId, content} = req.body
        if(!userId || !content){
            res.send({result: false, detail: '작성자와 내용을 모두 입력해주세요'})
        }else{
            next();
        }
    },
    find_comment_writer: async (req, res, next) => {
        const writer = await Promise.resolve(userService.findByUserId(req.body.userId));

        if(!writer){
            res.send({result: false, detail: '해당 유저가 존재하지 않습니다.'});
        }else{
            req.writer = writer;
            next();
        }
    },
    is_comment_post: async (req, res, next) => {
        const post = await Promise.resolve(postService.isExistPost(req.body.post_id));

        if(!post){
            res.send({result: false, detail: '해당 포스팅이 존재하지 않습니다.'});
        }else{
            next();
        }
    },
    update_comment_validation: (req, res, next) => {
        const {content} = req.body;
        if(!content){
            res.send({result: false, detail: '내용을 입력해주세요.'});
        }else{
            next();
        }
    },

}