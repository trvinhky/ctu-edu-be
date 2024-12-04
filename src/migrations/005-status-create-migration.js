'use strict'
const { STATUS } = require("../utils/constants")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('status', {
            status_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            status_index: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            status_name: {
                type: Sequelize.ENUM,
                values: Object.values(STATUS),
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('status')
    }
}