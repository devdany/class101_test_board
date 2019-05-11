const connector = require('../connector');
const Sequelize = require('sequelize');
const metaFields = require('./MetaFields');

const {create_dt} = metaFields;

const User = connector.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    create_dt,
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
})

module.exports = User;