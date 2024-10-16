const db = require("../models")

const AnswerServices = {
    async create(answer) {
        return await db.Answer.create(answer)
    },
    async update(answer, answer_Id, transaction) {
        await db.Answer.update(
            answer,
            { where: { answer_Id } },
            transaction
        )

        return await db.Answer.findOne({
            where: { answer_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const question_Id = params.question
        const student_Id = params.student
        const option_Id = params.option

        const where = {}

        if (question_Id) where.question_Id = question_Id
        if (student_Id) where.student_Id = student_Id
        if (option_Id) where.option_Id = option_Id

        return await db.Answer.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {
                    model: db.Question,
                    as: 'question'
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
                },
                {
                    model: db.Option,
                    as: 'option'
                }
            ]
        })
    }
}

module.exports = AnswerServices