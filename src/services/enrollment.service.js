const db = require("../models")

const EnrollmentServices = {
    async create(enrollment) {
        return await db.Enrollment.create(enrollment)
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student
        const course_Id = params.course

        const where = {}

        if (student_Id) where.student_Id = student_Id
        if (course_Id) where.course_Id = course_Id

        return await db.Enrollment.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {
                    model: db.Course,
                    as: 'course',
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
                },
                {
                    model: db.Account,
                    as: 'student',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'role_Id'
                        ]
                    },
                }
            ]
        })
    },
    async delete(student_Id, course_Id) {
        return await db.Enrollment.destroy({
            where: { student_Id, course_Id }
        });
    }
}

module.exports = EnrollmentServices