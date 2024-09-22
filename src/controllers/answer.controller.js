const db = require("../models")
const AnswerServices = require("../services/answer.service")

const AnswerControllers = {
    async create(req, res) {
        const {
            option_Id,
            student_Id,
            question_Id,
            answer_correct
        } = req.body

        if (!student_Id || !option_Id || !question_Id) {
            return res.errorValid()
        }

        try {
            const newAnswer = await AnswerServices.create(
                {
                    option_Id,
                    student_Id,
                    question_Id,
                    answer_correct: !!answer_correct
                }
            )

            if (newAnswer) {
                return res.successNoData('Thêm mới câu trả lời thành công!')
            }

            return res.error(404, 'Thêm mới câu trả lời thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            option_Id,
            student_Id,
            question_Id,
            answer_correct
        } = req.body
        const { id } = req.params

        if (!id || !option_Id || !student_Id || !question_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const answer = await AnswerServices.update(
                {
                    option_Id,
                    student_Id,
                    question_Id,
                    answer_correct: !!answer_correct
                },
                id,
                transaction
            )

            if (answer) {
                await transaction.commit()
                return res.successNoData('Cập nhật câu trả lời thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Cập nhật câu trả lời thất bại!')
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, question, student, option } = req.query

        if (!(question || student || option)) {
            return res.errorValid('Id câu hỏi, học viên hoặc lựa chọn không tồn tại!')
        }

        try {
            const students = await AnswerServices.getAll({
                page, limit, question, student, option
            })

            if (students) {
                return res.success(
                    'Lấy tất cả câu trả lời thành công!',
                    students
                )
            }

            return res.error(404, 'Lấy tất cả câu trả lời thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = AnswerControllers