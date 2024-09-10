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
            lesson_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'lessons',
                    key: 'lesson_Id'
                }
            },
            resource_type: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'types',
                    key: 'type_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('resources')
    }
}