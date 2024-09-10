'use strict';
const { ROLES } = require("../utils/constants");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('role', [
            {
                role_Id: '9743a673-0e72-456d-bceb-3a9cbe74fb09',
                role_name: ROLES.USER
            },
            {
                role_Id: 'e4401e12-7c63-4ac9-9b76-afdd136db326',
                role_name: ROLES.ADMIN
            },
            {
                role_Id: 'b856fdf6-b2b2-4976-bc80-a8611d699359',
                role_name: ROLES.TEACHER
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('role', null, {});
    }
};
