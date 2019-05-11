const Sequelize = require('sequelize');

const metaFields = {
    create_dt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    update_dt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    delete_dt: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

module.exports = metaFields;