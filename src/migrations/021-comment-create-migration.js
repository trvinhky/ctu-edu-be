'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('comments', {
            comment_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            comment_content: {
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
            post_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'posts',
                    key: 'post_Id'
                }
            },
            account_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            },
            parent_Id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'comments',
                    key: 'comment_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('comments')
    }
}