'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('formats', {
            format_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            format_name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            format_accept: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            format_description: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('formats')
    }
}