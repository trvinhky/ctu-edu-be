'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('profiles', {
            profile_Id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            profile_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            profile_address: {
                type: Sequelize.STRING(500)
            },
            profile_phone: {
                type: Sequelize.STRING
            },
            profile_avatar: {
                type: Sequelize.STRING(500)
            },
            profile_birthday: {
                type: Sequelize.DATE
            },
            profile_info: {
                type: Sequelize.TEXT
            },
            profile_score: {
                type: Sequelize.INTEGER
            },
            account_Id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'account',
                    key: 'account_Id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('profiles')
    }
}