'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('courses', {
            course_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            course_name: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            course_image: {
                type: Sequelize.STRING(500),
            },
            course_content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            teacher_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            },
            subject_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'subjects',
                    key: 'subject_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('courses')
    }
}