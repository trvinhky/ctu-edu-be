const db = require("../models")

const OptionServices = {
    async create(option) {
        return await db.Option.create(option)
    },
    async getOne(option_Id) {
        return await db.Option.findOne({
            where: { option_Id },
            include: [
                {
                    model: db.Question,
                    as: 'question'
                }
            ]
        })
    },
    async findByCorrect(params) {
        const question_Id = params.question ?? ''
        const option_is_correct = params.correct ? JSON.parse(params.correct) : false

        if (!question_Id) return null

        return await db.Option.findAndCountAll({
            where: { option_is_correct, question_Id },
            include: [
                {
                    model: db.Question,
                    as: 'question'
                }
            ]
        })
    },
    async update(option, option_Id, transaction) {
        await db.Option.update(
            option,
            { where: { option_Id } },
            transaction
        )

        return await db.Option.findOne({
            where: { option_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const question_Id = params.id ?? ''
        const where = {}

        if (question_Id) where.question_Id = question_Id

        return await db.Option.findAndCountAll({
            limit,
            offset,
            where
        })
    },
    async delete(option_Id) {
        return await db.Option.destroy({
            where: { option_Id }
        });
    }
}

module.exports = OptionServices