'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('reviews', {
            review_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            review_rating: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            review_comment: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            course_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'courses',
                    key: 'course_Id'
                }
            },
            student_Id: {
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
        await queryInterface.dropTable('reviews')
    }
}