const connector = require('../connector');
const Sequelize = require('sequelize');
const metaFields = require('./MetaFields');

const {create_dt} = metaFields;

const Log = connector.define('log', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    model:{
        type: Sequelize.ENUM('User', 'Post', 'Comment'),
        allowNull: true
    },
    detail: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    create_dt,
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
})

module.exports = Log;