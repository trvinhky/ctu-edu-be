const db = require("../models")

const PostServices = {
    async create(post) {
        return await db.Post.create(post)
    },
    async getOne(post_Id) {
        return await db.Post.findOne({
            where: { post_Id },
            include: [
                {
                    model: db.Status,
                    as: 'status'
                },
                {
                    model: db.Format,
                    as: 'format'
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
        })
    },
    async update(post, post_Id, transaction) {
        await db.Post.update(
            post,
            { where: { post_Id } },
            transaction
        )

        return await await db.Post.findOne({
            where: { post_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const status_Id = params.status
        const account_Id = params.account
        const format_Id = params.format
        const title = params.title
        const auth = params.auth
        const year = params.year
        const month = params.month
        const post_Id = params.id
        const status_index = !isNaN(+params.index) && +params.index

        const where = {}
        const whereSub = {}

        if (status_Id) where.status_Id = status_Id
        if (account_Id) where.account_Id = account_Id
        if (title) {
            where.post_title = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }
        if (format_Id) where.format_Id = format_Id
        if (status_index) whereSub.status_index = status_index
        if (!isNaN(+year) && !isNaN(month)) {
            where.createdAt = {
                [db.Sequelize.Op.and]: [
                    db.Sequelize.where(db.Sequelize.fn('MONTH', db.Sequelize.col('Post.createdAt')), +month),
                    db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('Post.createdAt')), +year),
                ]
            }
        }

        if (auth) {
            where.post_author = {
                [db.Sequelize.Op.like]: `%${auth}%`
            }
        }
        if (post_Id) {
            where.post_Id = {
                [db.Sequelize.Op.ne]: post_Id
            }
        }

        return await db.Post.findAndCountAll({
            limit,
            offset,
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.Status,
                    as: 'status',
                    ...(Object.keys(whereSub).length > 0 && { where: whereSub }),
                },
                {
                    model: db.Format,
                    as: 'format'
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
            ],
            distinct: true,
            order: [[db.Sequelize.col('Post.createdAt'), "DESC"]]
        })
    },
    async delete(post_Id) {
        return await db.Post.destroy({
            where: { post_Id }
        });
    }
}

module.exports = PostServices