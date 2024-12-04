'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('stores', {
            store_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            store_image: {
                type: Sequelize.STRING(500),
            },
            store_title: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('stores')
    }
}