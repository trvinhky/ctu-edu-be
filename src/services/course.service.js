const db = require("../models")

const CourseServices = {
    async create(course) {
        return await db.Course.create(course)
    },
    async update(course, course_Id) {
        return await db.Course.update(
            course,
            { where: { course_Id } }
        )
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
                    model: db.Field,
                    as: 'field'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const title = params.title ?? ''
        const field_Id = params.field ?? ''

        return await db.Course.findAndCountAll({
            limit,
            offset,
            where: {
                course_name: {
                    [db.Sequelize.Op.like]: `%${title}%`
                },
                field_Id
            },
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
                    model: db.Field,
                    as: 'field'
                }
            ]
        })
    }
}

module.exports = CourseServices