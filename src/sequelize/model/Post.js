const connector = require('../connector');
const Sequelize = require('sequelize');
const metaFields = require('./MetaFields');

const {create_dt, update_dt, delete_dt} = metaFields;

const Post = connector.define('post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //user_id pk
    writer:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    is_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    create_dt,
    update_dt,
    delete_dt
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
})

module.exports = Post;