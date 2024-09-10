'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('discussions', {
            discussion_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            discussion_comment: {
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
            lesson_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'lessons',
                    key: 'lesson_Id'
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
                    model: 'discussions',
                    key: 'discussion_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('discussions')
    }
}