const db = require("../models")

const DiscussionServices = {
    async create(discussion) {
        return await db.Discussion.create(discussion)
    },
    async getOne(discussion_Id) {
        return await db.Discussion.findOne({
            where: { discussion_Id },
            include: [
                {
                    model: db.Discussion,
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
                    model: db.Discussion,
                    as: 'replies'
                }
            ]
        })
    },
    async update(discussion, discussion_Id) {
        return await db.Discussion.update(
            discussion,
            { where: { discussion_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const lesson_Id = params.id ?? ''

        return await db.Discussion.findAndCountAll({
            limit,
            offset,
            where: { lesson_Id },
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

module.exports = DiscussionServices