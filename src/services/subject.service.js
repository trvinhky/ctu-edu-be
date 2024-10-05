const db = require("../models")

const SubjectServices = {
    async create(subject) {
        return await db.Subject.create(subject)
    },
    async update(subject_name, subject_Id) {
        const subject = await db.Subject.findOne(
            { where: { subject_Id } }
        )

        if (subject) {
            subject.subject_name = subject_name
            return await subject.save()
        }

        return null
    },
    async getOne(subject_Id) {
        return await db.Subject.findOne({
            where: { subject_Id },
            include: [
                {
                    model: db.Course,
                    as: 'courses'
                },
                {
                    model: db.Post,
                    as: 'posts',
                    include: [{
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
                    }]
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        const role = {
            include: [
                {
                    model: db.Course,
                    as: 'courses'
                },
                {
                    model: db.Post,
                    as: 'posts',
                    include: [{
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
                    }]
                }
            ]
        }

        if (params.page) {
            role.limit = limit
            role.offset = offset
        }

        return await db.Subject.findAndCountAll(role)
    }
}

module.exports = SubjectServices