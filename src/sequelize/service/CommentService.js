const Comment = require('../model/Comment');
const DateFormat = require('../../lib/DateFormatConverter');

module.exports = {
    writeComment: (comment) => Comment.create({
        ...comment,
        create_dt: DateFormat.convertToSave(new Date())
    }),
    update: (comment_id, update) => Comment.update({
        ...update,
        update_dt: DateFormat.convertToSave(new Date())
    },{
        where:{
            id: comment_id
        }
    }),
    delete: (comment_id) => Comment.update({
        is_delete: true,
        delete_dt: DateFormat.convertToSave(new Date()),
    },{
        where:{
            id: comment_id
        }
    }),
}
