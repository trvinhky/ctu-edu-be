const db = require("../models")

const QuestionExamServices = {
    async create(question_exam) {
        return await db.QuestionExam.create(question_exam)
    },
    async update(question_exam) {
        return await db.QuestionExam.update(
            question_exam,
            {
                where: {
                    exam_Id: question_exam.exam_Id,
                    question_Id: question_exam.question_Id
                }
            }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const exam_Id = params.exam
        const question_Id = params.question
        const title = params.title
        const where = {}
        const whereSub = {}

        if (exam_Id) where.exam_Id = exam_Id
        if (question_Id) where.question_Id = question_Id

        if (title) {
            whereSub.question_content = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        return await db.QuestionExam.findAndCountAll({
            where,
            limit,
            offset,
            order: db.Sequelize.literal('RAND()'), // Dùng 'RANDOM()' nếu là PostgreSQL
            include: [
                {
                    model: db.Exam,
                    as: 'exam'
                },
                {
                    model: db.Question,
                    as: 'question',
                    where: whereSub,
                    include: [
                        {
                            model: db.Category,
                            as: 'category'
                        },
                        {
                            model: db.Option,
                            as: 'options'
                        }
                    ]
                }
            ]
        })
    },
    async delete(params) {
        const exam_Id = params.exam
        const question_Id = params.question

        return await db.QuestionExam.destroy({
            where: { exam_Id, question_Id }
        });
    }
}

module.exports = QuestionExamServices