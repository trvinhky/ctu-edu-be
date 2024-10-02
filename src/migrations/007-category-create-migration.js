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
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            category_accept: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category_description: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('categories')
    }
}