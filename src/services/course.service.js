const db = require("../models")

const CourseServices = {
    async create(course) {
        return await db.Course.create(course)
    },
    async update(course, course_Id, transaction) {
        await db.Course.update(
            course,
            { where: { course_Id } },
            transaction
        )

        return await db.Course.findOne({
            where: { course_Id },
            transaction
        })
    },
    async getOne(params) {
        return await db.Course.findOne({
            where: params,
            include: [
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
                },
                {
                    model: db.Subject,
                    as: 'subject'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const title = params.title ?? ''
        const subject_Id = params.subject ?? ''
        const teacher_Id = params.teacher ?? ''
        const where = {}

        if (title) {
            where.course_name = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        if (subject_Id) {
            where.subject_Id = subject_Id
        }

        if (teacher_Id) {
            where.teacher_Id = teacher_Id
        }

        return await db.Course.findAndCountAll({
            limit,
            offset,
            where,
            include: [
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
                },
                {
                    model: db.Subject,
                    as: 'subject'
                }
            ]
        })
    }
}

module.exports = CourseServices