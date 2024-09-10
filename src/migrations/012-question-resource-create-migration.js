'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('question_resource', {
            question_resource_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            question_resource_url: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            resource_type: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'types',
                    key: 'type_Id'
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
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('question_resource')
    }
}