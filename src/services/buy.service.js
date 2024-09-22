const db = require("../models")

const BuyServices = {
    async create(buy) {
        return await db.Buy.create(buy)
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student ?? ''
        const resource_Id = params.resource ?? ''

        return await db.Buy.findAndCountAll({
            where: { student_Id, resource_Id },
            limit,
            offset,
            include: [
                {
                    model: db.Resource,
                    as: 'resource'
                },
                {
                    model: db.Account,
                    as: 'student',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'role_Id'
                        ]
                    },
                }
            ]
        })
    }
}

module.exports = BuyServices