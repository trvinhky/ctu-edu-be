'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('reviews', {
            review_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            review_ratings: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            review_content: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            document_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'documents',
                    key: 'document_Id'
                }
            },
            account_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'account_Id'
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
        await queryInterface.dropTable('reviews')
    }
}