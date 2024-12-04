'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('histories', {
            history_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            history_createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            recharge_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'recharges',
                    key: 'recharge_Id'
                }
            },
            account_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'account_Id'
                }
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('histories')
    }
}