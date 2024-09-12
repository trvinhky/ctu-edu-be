'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            category_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            category_name: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('categories')
    }
}