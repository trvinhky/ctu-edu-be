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
                    as: 'teacher',
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
    async update(post, post_Id) {
        return await db.Post.update(
            post,
            { where: { post_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const status_Id = params.status ?? ''
        const auth_Id = params.auth

        return await db.Post.findAndCountAll({
            limit,
            offset,
            where: { auth_Id, status_Id },
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
                    as: 'teacher',
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
    async delete(params) {
        const status_Id = params.status
        const post_Id = params.id
        return await db.Post.destroy({
            where: { status_Id, post_Id }
        });
    }
}

module.exports = PostServices