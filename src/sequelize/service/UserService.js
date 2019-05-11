const User = require('../model/User')

module.exports = {
    findByUserId: (userId) => User.findOne({
        where:{
            user_id: userId
        }
    })
}