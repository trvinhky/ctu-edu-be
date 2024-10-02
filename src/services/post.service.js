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
                    model: db.Subject,
                    as: 'subject'
                },
                {
                    model: db.Account,
                    as: 'auth',
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
        const auth_Id = params.auth
        const subject_Id = params.subject
        const title = params.title

        const where = {}

        if (status_Id) where.status_Id = status_Id
        if (auth_Id) where.auth_Id = auth_Id
        if (title) {
            where.post_title = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }
        if (subject_Id) where.subject_Id = subject_Id

        return await db.Post.findAndCountAll({
            limit,
            offset,
            where,
            include: [
                {
                    model: db.Status,
                    as: 'status'
                },
                {
                    model: db.Subject,
                    as: 'subject'
                },
                {
                    model: db.Account,
                    as: 'auth',
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
        })
    },
    async delete(post_Id) {
        return await db.Post.destroy({
            where: { post_Id }
        });
    }
}

module.exports = PostServices