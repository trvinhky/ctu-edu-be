'use strict';
const { FORMATS, ACCEPT, DESCRIPTIONS } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('formats', [
            {
                format_Id: '6db0c3a7-3666-441f-b0a2-5ff127bba96f',
                format_name: FORMATS.OTHER,
                format_accept: ACCEPT.OTHER,
                format_description: DESCRIPTIONS.OTHER
            },
            {
                format_Id: '1b325f5d-86fe-4956-9d2f-77bd8d14f6d7',
                format_name: FORMATS.DOCUMENT,
                format_accept: ACCEPT.DOCUMENT,
                format_description: DESCRIPTIONS.DOCUMENT
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('formats', null, {});
    }
};
