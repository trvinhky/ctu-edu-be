'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('questions', {
            question_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            question_content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            category_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'category_Id'
                }
            },
            auth_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('questions')
    }
}