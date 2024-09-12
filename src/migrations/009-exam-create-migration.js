'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('exams', {
            exam_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            exam_title: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            exam_description: {
                type: Sequelize.TEXT
            },
            exam_total_score: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            exam_start_time: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            exam_limit: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            course_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'courses',
                    key: 'course_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exams')
    }
}