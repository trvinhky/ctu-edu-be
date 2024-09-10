'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('account', {
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
            account_active: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            account_token: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            role_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'role',
                    key: 'role_Id'
                }
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('account')
    }
}