'use strict';
const { CATEGORY } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {
                category_Id: 'a21aff4e-74cd-46ec-adf8-2499379ac0b1',
                category_name: CATEGORY.ONE
            },
            {
                category_Id: '6438a022-01ae-42a6-a401-6ac0622e34c8',
                category_name: CATEGORY.MULTIPLE
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
