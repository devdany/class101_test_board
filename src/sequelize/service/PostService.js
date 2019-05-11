const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User');
const DateFormat = require('../../lib/DateFormatConverter');

module.exports = {
    writePost: (post) => Post.create({
        ...post,
        create_dt: DateFormat.convertToSave(new Date())
    })
}