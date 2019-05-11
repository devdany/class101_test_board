const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User')

module.exports = {
    findByUserId: (userId) => User.findOne({
        where:{
            user_id: userId
        }
    })
}