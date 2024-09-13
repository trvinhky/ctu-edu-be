const db = require("../models")

const RoleServices = {
    async create(role) {
        return await db.Role.create(role)
    },
    async getOne(params) {
        let where = params
        if (params.role_name) {
            where = {
                role_name: {
                    [db.Sequelize.Op.like]: `%${params.role_name}%`
                }
            }
        }
        return await db.Role.findOne({
            where,
            include: [{
                model: db.Account,
                as: 'accounts',
                exclude: ['account_password', 'account_token']
            }]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Role.findAndCountAll({
            limit,
            offset,
            include: [{
                model: db.Account,
                as: 'accounts',
                exclude: ['account_password', 'account_token']
            }]
        })
    }
}

module.exports = RoleServices