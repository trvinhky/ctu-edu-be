'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('recharges', {
            recharge_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            recharge_money: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            recharge_score: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('recharges')
    }
}