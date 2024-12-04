'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('documents', {
            document_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            document_title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            document_url: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            document_sub: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            document_score: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            document_year: {
                type: Sequelize.INTEGER
            },
            document_page: {
                type: Sequelize.INTEGER
            },
            document_capacity: {
                type: Sequelize.DOUBLE
            },
            document_content: {
                type: Sequelize.TEXT
            },
            document_author: {
                type: Sequelize.STRING
            },
            format_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'formats',
                    key: 'format_Id'
                }
            },
            store_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'stores',
                    key: 'store_Id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('documents')
    }
}