const connector = require('../connector');
const Sequelize = require('sequelize');
const metaFields = require('./MetaFields');

const {create_dt} = metaFields;

const Comment = connector.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    //user pk
    writer:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    //post pk
    post:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    create_dt,
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
})

module.exports = Comment;