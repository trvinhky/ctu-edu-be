const db = require("../models")

const EnrollmentServices = {
    async create(enrollment) {
        return await db.Enrollment.create(enrollment)
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student ?? ''
        const course_Id = params.course ?? ''

        return await db.Enrollment.findAndCountAll({
            where: { student_Id, course_Id },
            limit,
            offset,
            include: [
                {
                    model: db.Course,
                    as: 'courses'
                },
                {
                    model: db.Account,
                    as: 'students',
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
    }
}

module.exports = EnrollmentServices