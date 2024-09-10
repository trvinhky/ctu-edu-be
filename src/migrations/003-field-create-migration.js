'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('fields', {
            field_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            field_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            field_description: {
                type: Sequelize.TEXT
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('fields')
    }
}