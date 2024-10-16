const db = require("../models")

const ResultServices = {
    async create(result) {
        return await db.Result.create(result)
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student
        const exam_Id = params.exam

        const where = {}

        if (student_Id) where.student_Id = student_Id
        if (exam_Id) where.exam_Id = exam_Id

        return await db.Result.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {
                    model: db.Exam,
                    as: 'exam'
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

module.exports = ResultServices