'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('subjects', {
            subject_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            subject_name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('subjects')
    }
}