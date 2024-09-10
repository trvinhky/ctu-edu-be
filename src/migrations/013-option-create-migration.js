'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('options', {
            option_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            option_content: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            option_is_correct: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            question_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'question_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('options')
    }
}