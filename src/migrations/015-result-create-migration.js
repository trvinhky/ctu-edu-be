'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('results', {
            student_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            },
            exam_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'exams',
                    key: 'exam_Id'
                }
            },
            result_score: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            result_completed: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('results')
    }
}