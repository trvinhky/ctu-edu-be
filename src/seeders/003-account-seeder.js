'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('accounts', [
            {
                account_Id: '08e12b5a-9a79-41cc-bea0-12245cf00d9a',
                account_email: 'vinhky26032002@gmail.com',
                account_password: '$2b$10$NL6imh4Iyyg8mdjhG7CQluI2sgTEtG.S9k3/vcTMvxtDSKI5q45qe',
                account_admin: true,
                account_token: null,
                account_name: 'vĩnh ký',
                account_score: 999,
                account_band: false,
                createdAt: '2024-11-30 10:19:55',
                updatedAt: '2024-11-30 10:47:41'
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accounts', null, {});
    }
};
