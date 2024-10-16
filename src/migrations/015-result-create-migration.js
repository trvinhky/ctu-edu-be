'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('results', {
            result_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            result_completed: {
                type: Sequelize.DATE,
                allowNull: false
            },
            student_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            },
            exam_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'exams',
                    key: 'exam_Id'
                }
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('results')
    }
}