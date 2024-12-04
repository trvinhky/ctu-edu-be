'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('recharges', [
            {
                recharge_Id: '0d495805-b4fb-4077-a95d-2b5fcd37dce8',
                recharge_money: 100000,
                recharge_score: 110,
            },
            {
                recharge_Id: '0d4c3234-4ce0-4d15-af26-d52587508201',
                recharge_money: 50000,
                recharge_score: 54,
            },
            {
                recharge_Id: '0db6831d-c736-44b3-903e-96652857c634',
                recharge_money: 200000,
                recharge_score: 225,
            },
            {
                recharge_Id: '2da0a419-3bc6-42bc-8c09-7865070f178a',
                recharge_money: 20000,
                recharge_score: 22,
            },
            {
                recharge_Id: 'b549a3ca-8bbd-48b2-abc1-ca6801bd88d7',
                recharge_money: 10000,
                recharge_score: 10,
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('recharges', null, {});
    }
};
