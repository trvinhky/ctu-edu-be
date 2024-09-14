'use strict';
const { STATUS } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('status', [
            {
                status_Id: 'f94b96cc-fc9a-43b7-9791-8bfe7c109930',
                status_name: STATUS.PENDING
            },
            {
                status_Id: '9097011b-94c6-420d-bd5c-bed9908df657',
                status_name: STATUS.CONFIRM
            },
            {
                status_Id: 'b3811a5e-0e30-4fa3-8ce6-39f494c8b441',
                status_name: STATUS.CANCEL
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('status', null, {});
    }
};
