const Sequelize = require('sequelize');
const databaseConfig = require('../../config');
const Op = Sequelize.Op;

const db_config =  process.env.NODE_ENV !== 'DEV' ? databaseConfig.db.prod : databaseConfig.db.dev;

const sequelize = new Sequelize(
    db_config.schema ,
    db_config.username,
    db_config.password,
    {
        'host': db_config.host,
        'dialect': db_config.dialect,
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like,
            $ne: Op.ne
        },
        //logging: false
    },

)

module.exports = sequelize;