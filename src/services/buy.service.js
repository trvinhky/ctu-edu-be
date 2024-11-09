const db = require("../models")

const BuyServices = {
    async create(buy, transaction) {
        return await db.Buy.create(buy, { transaction })
    },
    async getOne(account_Id, document_Id) {
        return await db.Buy.findOne({
            where: { account_Id, document_Id },
            include: [
                {
                    model: db.Document,
                    as: 'document',
                    include: [
                        {
                            model: db.Format,
                            as: 'format'
                        }
                    ]
                },
                {
                    model: db.Account,
                    as: 'account',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'account_admin'
                        ]
                    },
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const account_Id = params.account
        const document_Id = params.document
        const title = params.title
        const score = isNaN(+params.score) && +params.score

        const where = {}

        if (account_Id) where.account_Id = account_Id
        if (document_Id) where.document_Id = document_Id

        const whereSub = {}

        if (title) {
            whereSub.document_title = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        if (score) {
            whereSub.document_score = { [db.Sequelize.Op.lte]: score }
        }

        const roleObj = {
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.Document,
                    as: 'document',
                    ...(Object.keys(whereSub).length > 0 && { where: whereSub }),
                    include: [
                        {
                            model: db.Format,
                            as: 'format'
                        }
                    ]
                },
                {
                    model: db.Account,
                    as: 'account',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'account_admin'
                        ]
                    },
                }
            ]
        }

        if (page) {
            roleObj.limit = limit
            roleObj.offset = offset
        }

        return await db.Buy.findAndCountAll(roleObj)
    }
}

module.exports = BuyServices