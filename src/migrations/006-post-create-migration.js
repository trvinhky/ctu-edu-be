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
            post_url: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            post_sub: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            post_year: {
                type: Sequelize.INTEGER
            },
            post_page: {
                type: Sequelize.INTEGER
            },
            post_capacity: {
                type: Sequelize.DOUBLE
            },
            post_author: {
                type: Sequelize.STRING
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
            format_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'formats',
                    key: 'format_Id'
                }
            },
            account_Id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'account_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('posts')
    }
}