const Sequelize = require('sequelize');

const metaFields = {
    create_dt: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

module.exports = metaFields;