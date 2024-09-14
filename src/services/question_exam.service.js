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
        const exam_Id = params.exam ?? ''
        const question_Id = params.question ?? ''

        return await db.QuestionExam.findAndCountAll({
            where: { exam_Id, question_Id },
            limit,
            offset,
            include: [
                {
                    model: db.Exam,
                    as: 'exams'
                },
                {
                    model: db.Question,
                    as: 'questions',
                    order: Sequelize.literal('RAND()') // Dùng 'RANDOM()' nếu là PostgreSQL
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