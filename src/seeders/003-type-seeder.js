'use strict';
const { TYPE } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('types', [
            {
                category_Id: 'a21aff4e-74cd-46ec-adf8-2499379ac0b1',
                category_name: TYPE.ONE
            },
            {
                category_Id: '6438a022-01ae-42a6-a401-6ac0622e34c8',
                category_name: TYPE.MULTIPLE
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('types', null, {});
    }
};
