'use strict'
const { TYPE } = require("../utils/constants")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('types', {
            type_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            type_name: {
                type: Sequelize.ENUM,
                values: Object.values(TYPE),
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('types')
    }
}