'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('lessons', {
            lesson_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            lesson_title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lesson_content: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('lessons')
    }
}