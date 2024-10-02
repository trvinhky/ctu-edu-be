'use strict';
const { CATEGORY, ACCEPT, DESCRIPTION } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {
                category_Id: '6db0c3a7-3666-441f-b0a2-5ff127bba96f',
                category_name: CATEGORY.OTHER,
                category_accept: ACCEPT.OTHER,
                category_description: DESCRIPTION.OTHER
            },
            {
                category_Id: 'c5626118-a6f8-49b0-b792-5ac3fb5884c0',
                category_name: CATEGORY.IMAGE,
                category_accept: ACCEPT.IMAGE,
                category_description: DESCRIPTION.IMAGE
            },
            {
                category_Id: 'edfb12ab-e721-4c66-b38a-68737641bd73',
                category_name: CATEGORY.VIDEO,
                category_accept: ACCEPT.VIDEO,
                category_description: DESCRIPTION.VIDEO
            },
            {
                category_Id: '749a43ef-cbaa-4f36-ad6a-de1a2d204c29',
                category_name: CATEGORY.AUDIO,
                category_accept: ACCEPT.AUDIO,
                category_description: DESCRIPTION.AUDIO
            },
            {
                category_Id: 'b93a61c3-c855-48d9-8aa6-666cc62d8906',
                category_name: CATEGORY.CODE,
                category_accept: ACCEPT.CODE,
                category_description: DESCRIPTION.CODE
            },
            {
                category_Id: 'b972f457-ccef-4268-aaae-e5de0f1abcf2',
                category_name: CATEGORY.DATABASE,
                category_accept: ACCEPT.DATABASE,
                category_description: DESCRIPTION.DATABASE
            },
            {
                category_Id: '67f7b78e-b4fd-422f-944d-0a689ceadc8d',
                category_name: CATEGORY.EXECUTE,
                category_accept: ACCEPT.EXECUTE,
                category_description: DESCRIPTION.EXECUTE
            },
            {
                category_Id: '1b325f5d-86fe-4956-9d2f-77bd8d14f6d7',
                category_name: CATEGORY.DOCUMENT,
                category_accept: ACCEPT.DOCUMENT,
                category_description: DESCRIPTION.DOCUMENT
            },
            {
                category_Id: '6841ece1-19bb-49e3-9c61-9e5812449725',
                category_name: CATEGORY.GRAPHIC_DESIGN,
                category_accept: ACCEPT.GRAPHIC_DESIGN,
                category_description: DESCRIPTION.GRAPHIC_DESIGN
            },
            {
                category_Id: '1bbf62a1-de3c-4579-afa0-0a3df8ee58a0',
                category_name: CATEGORY.PRE_SHEET,
                category_accept: ACCEPT.PRE_SHEET,
                category_description: DESCRIPTION.PRE_SHEET
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
