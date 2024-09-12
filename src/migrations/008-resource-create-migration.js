'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('resources', {
            resource_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            resource_url: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            resource_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            lesson_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'lessons',
                    key: 'lesson_Id'
                }
            },
            category_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'category_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('resources')
    }
}