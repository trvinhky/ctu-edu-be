const db = require("../models")

const ResultServices = {
    async create(result) {
        return await db.Result.create(result)
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student ?? ''
        const exam_Id = params.exam ?? ''

        return await db.Result.findAndCountAll({
            where: { student_Id, exam_Id },
            limit,
            offset,
            include: [
                {
                    model: db.Exam,
                    as: 'exams'
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