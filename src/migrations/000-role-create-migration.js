'use strict'
const { ROLES } = require("../utils/constants")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('role', {
            role_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            role_name: {
                type: Sequelize.ENUM,
                values: Object.values(ROLES),
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('role')
    }
}