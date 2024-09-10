'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('answers', {
            answer_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            answer_correct: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            option_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'options',
                    key: 'option_Id'
                }
            },
            student_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            },
            question_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'questions',
                    key: 'question_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('answers')
    }
}