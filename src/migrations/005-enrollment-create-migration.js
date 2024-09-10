'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('enrollments', {
            course_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'courses',
                    key: 'course_Id'
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
            enrollment_date: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('enrollments')
    }
}