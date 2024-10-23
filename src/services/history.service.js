const db = require("../models")

const HistoryServices = {
    async create(history) {
        return await db.History.create(history)
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const account_Id = params.account
        const recharge_Id = params.recharge

        const where = {}

        if (account_Id) where.account_Id = account_Id
        if (recharge_Id) where.recharge_Id = recharge_Id

        const role = {
            where,
            include: [
                {
                    model: db.Recharge,
                    as: 'recharge'
                },
                {
                    model: db.Account,
                    as: 'account',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'role_Id'
                        ]
                    },
                    include: [
                        {
                            model: db.Profile,
                            as: 'profile'
                        }
                    ]
                }
            ]
        }

        if (params.page) {
            role.limit = limit
            role.offset = offset
        }

        return await db.History.findAndCountAll(role)
    },
    async getTotalMoney(params) {
        const account_Id = params.account
        const where = {}

        if (account_Id) where.account_Id = account_Id

        return await db.History.findAll({
            include: [
                {
                    model: db.Recharge,
                    as: 'recharge'
                }
            ],
            where,
            attributes: [
                [db.Sequelize.fn('SUM', db.Sequelize.col('recharge.recharge_money')), 'total'] // tính tổng tiền từ Recharge với alias đúng
            ],
            group: ['History.recharge_Id'],
            raw: true
        })
    }
}

module.exports = HistoryServices