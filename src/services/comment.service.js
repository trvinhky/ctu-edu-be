const db = require("../models")

const CommentServices = {
    async create(comment) {
        return await db.Comment.create(comment)
    },
    async getOne(comment_Id) {
        return await db.Comment.findOne({
            where: { comment_Id },
            include: [
                {
                    model: db.Comment,
                    as: 'parent'
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
                },
                {
                    model: db.Comment,
                    as: 'replies'
                }
            ]
        })
    },
    async update(comment, comment_Id) {
        return await db.Comment.update(
            comment,
            { where: { comment_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const post_Id = params.id

        const where = {}

        if (post_Id) where.post_Id = post_Id

        return await db.Comment.findAndCountAll({
            limit,
            offset,
            where,
            include: [
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
        })
    }
}

module.exports = CommentServices