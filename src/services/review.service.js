const db = require("../models")

const ReviewServices = {
    async create(review) {
        return await db.Review.create(review)
    },
    async getOne(review_Id) {
        return await db.Review.findOne({
            where: { review_Id },
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
        const review_ratings = isNaN(+params.ratings) && +params.ratings
        const document_Id = params.document
        const account_Id = params.account

        const where = {}
        if (review_ratings) {
            where.review_ratings = {
                [db.Sequelize.Op.lte]: review_ratings
            }
        }

        if (document_Id) {
            where.document_Id = document_Id
        }

        if (account_Id) {
            where.account_Id = account_Id
        }

        const check = {
            ...(Object.keys(where).length > 0 && { where }),
            distinct: true,
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
                    }
                }
            ]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Review.findAndCountAll(check)
    },
}

module.exports = ReviewServices