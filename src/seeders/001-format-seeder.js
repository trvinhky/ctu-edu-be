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
                format_Id: 'c5626118-a6f8-49b0-b792-5ac3fb5884c0',
                format_name: FORMATS.IMAGE,
                format_accept: ACCEPT.IMAGE,
                format_description: DESCRIPTIONS.IMAGE
            },
            {
                format_Id: 'edfb12ab-e721-4c66-b38a-68737641bd73',
                format_name: FORMATS.VIDEO,
                format_accept: ACCEPT.VIDEO,
                format_description: DESCRIPTIONS.VIDEO
            },
            {
                format_Id: '749a43ef-cbaa-4f36-ad6a-de1a2d204c29',
                format_name: FORMATS.AUDIO,
                format_accept: ACCEPT.AUDIO,
                format_description: DESCRIPTIONS.AUDIO
            },
            {
                format_Id: 'b93a61c3-c855-48d9-8aa6-666cc62d8906',
                format_name: FORMATS.CODE,
                format_accept: ACCEPT.CODE,
                format_description: DESCRIPTIONS.CODE
            },
            {
                format_Id: 'b972f457-ccef-4268-aaae-e5de0f1abcf2',
                format_name: FORMATS.DATABASE,
                format_accept: ACCEPT.DATABASE,
                format_description: DESCRIPTIONS.DATABASE
            },
            {
                format_Id: '67f7b78e-b4fd-422f-944d-0a689ceadc8d',
                format_name: FORMATS.EXECUTE,
                format_accept: ACCEPT.EXECUTE,
                format_description: DESCRIPTIONS.EXECUTE
            },
            {
                format_Id: '1b325f5d-86fe-4956-9d2f-77bd8d14f6d7',
                format_name: FORMATS.DOCUMENT,
                format_accept: ACCEPT.DOCUMENT,
                format_description: DESCRIPTIONS.DOCUMENT
            },
            {
                format_Id: '6841ece1-19bb-49e3-9c61-9e5812449725',
                format_name: FORMATS.GRAPHIC_DESIGN,
                format_accept: ACCEPT.GRAPHIC_DESIGN,
                format_description: DESCRIPTIONS.GRAPHIC_DESIGN
            },
            {
                format_Id: '1bbf62a1-de3c-4579-afa0-0a3df8ee58a0',
                format_name: FORMATS.PRE_SHEET,
                format_accept: ACCEPT.PRE_SHEET,
                format_description: DESCRIPTIONS.PRE_SHEET
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('formats', null, {});
    }
};
