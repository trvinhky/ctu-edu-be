const db = require("../models")

const QuestionServices = {
    async create(question) {
        return await db.Question.create(question)
    },
    async getOne(question_Id) {
        return await db.Question.findOne({
            where: { question_Id },
            include: [
                {
                    model: db.Option,
                    as: 'options'
                },
                {
                    model: db.Category,
                    as: 'category'
                }
            ]
        })
    },
    async update(question, question_Id, transaction) {
        await db.Question.update(
            question,
            { where: { question_Id } },
            transaction
        )

        return await db.Question.findOne({
            where: { question_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const auth_Id = params.immediate
        const title = params.title
        const where = {}

        if (auth_Id) where.auth_Id = auth_Id
        if (title) {
            where.question_content = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        return await db.Question.findAndCountAll({
            limit,
            offset,
            where,
            include: [
                {
                    model: db.Category,
                    as: 'category'
                }
            ]
        })
    },
    async delete(question_Id) {
        return await db.Question.destroy({
            where: { question_Id }
        });
    }
}

module.exports = QuestionServices