'use strict';
const { CATEGORY } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {
                type_Id: '6db0c3a7-3666-441f-b0a2-5ff127bba96f',
                type_name: CATEGORY.FILE
            },
            {
                type_Id: 'c5626118-a6f8-49b0-b792-5ac3fb5884c0',
                type_name: CATEGORY.IMAGE
            },
            {
                type_Id: 'edfb12ab-e721-4c66-b38a-68737641bd73',
                type_name: CATEGORY.VIDEO
            },
            {
                type_Id: '749a43ef-cbaa-4f36-ad6a-de1a2d204c29',
                type_name: CATEGORY.AUDIO
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
