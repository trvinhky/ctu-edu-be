const db = require("../models")

const BuyServices = {
    async create(buy) {
        return await db.Buy.create(buy)
    },
    async getOne(student_Id, lesson_Id) {
        return await db.Buy.findOne({
            where: { student_Id, lesson_Id },
            include: [
                {
                    model: db.Lesson,
                    as: 'lesson'
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
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student
        const lesson_Id = params.lesson

        const where = {}

        if (student_Id) where.student_Id = student_Id
        if (lesson_Id) where.lesson_Id = lesson_Id

        return await db.Buy.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {
                    model: db.Lesson,
                    as: 'lesson'
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
    }
}

module.exports = BuyServices