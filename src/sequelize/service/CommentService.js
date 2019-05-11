const Comment = require('../model/Comment');
const User = require('../model/User');
const DateFormat = require('../../lib/DateFormatConverter');

module.exports = {

    writeComment: (comment) => Comment.create({
        ...comment,
        create_dt: DateFormat.convertToSave(new Date())
    }),
    count: () => Comment.count({
        where: {
            is_delete: false
        }
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
    findPaging: (offset, limit) => {
        return Comment.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']],
            include:[
                {
                    model: User,
                    as: 'comment_writer'
                }
            ]
        })
    },
    findByUserId: (user_id) => {
        return Comment.findAll({
            where:{
                writer: user_id,
                is_delete: false
            }
        })
    }


}
