'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('posts', {
            post_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            post_title: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            post_content: {
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
            status_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'status',
                    key: 'status_Id'
                }
            },
            subject_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'subjects',
                    key: 'subject_Id'
                }
            },
            auth_Id: {
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
        await queryInterface.dropTable('posts')
    }
}