'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('role', {
            role_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            role_name: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('role')
    }
}