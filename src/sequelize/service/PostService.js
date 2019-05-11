const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User');
const DateFormat = require('../../lib/DateFormatConverter');

const post_default_include = [
    {
        model: Comment,
        as: 'comments',
        required: false
    },
    {
        model: User,
        as: 'post_writer'
    }
]

module.exports = {
    writePost: (post) => Post.create({
        ...post,
        create_dt: DateFormat.convertToSave(new Date())
    }),
    findOne: (post_id) => Post.findOne({
        where: {
            id: post_id,
            is_delete: false
        },
        include: post_default_include
    }),
    findAll: () => Post.findAll({
        where:{
            is_delete: false
        },
        include: post_default_include
    }),
    delete: (post_id) => Post.update({
        is_delete: true,
        delete_dt: DateFormat.convertToSave(new Date()),
    },{
        where:{
            id: post_id
        }
    }),
    update: (post_id, post) => Post.update({
        ...post,
        update_dt: DateFormat.convertToSave(new Date()),
    },{
        where:{
            id: post_id
        }
    })
}