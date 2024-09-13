'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('buy', {
            resource_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'resources',
                    key: 'resource_Id'
                }
            },
            student_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            },
            buy_date: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('buy')
    }
}