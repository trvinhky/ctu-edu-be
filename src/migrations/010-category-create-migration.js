'use strict'
const { CATEGORY } = require("../utils/constants")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            category_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            category_name: {
                type: Sequelize.ENUM,
                values: Object.values(CATEGORY),
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('categories')
    }
}