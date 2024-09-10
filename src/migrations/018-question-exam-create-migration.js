'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('question_exam', {
            exam_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'exams',
                    key: 'exam_Id'
                }
            },
            question_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'question_Id'
                }
            },
            question_exam_score: {
                type: Sequelize.DOUBLE,
                allowNull: false
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('question_exam')
    }
}