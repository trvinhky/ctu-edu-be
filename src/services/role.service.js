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
    async update(role, role_Id) {
        return await db.Role.update(
            role,
            { where: { role_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const check = params.child ? JSON.parse(params.child) : false

        return await db.Role.findAndCountAll({
            limit,
            offset,
            include: check ? [
                {
                    model: db.Account,
                    as: 'accounts',
                    exclude: ['account_password', 'account_token']
                }
            ] : []
        })
    }
}

module.exports = RoleServices