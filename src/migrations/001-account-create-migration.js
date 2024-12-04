'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accounts', {
            account_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            account_email: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false
            },
            account_password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            account_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            account_token: {
                type: Sequelize.STRING,
                unique: true
            },
            account_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            account_score: {
                type: Sequelize.INTEGER
            },
            account_band: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('accounts')
    }
}