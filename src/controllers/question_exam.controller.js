const QuestionExamServices = require("../services/question_exam.service")

const QuestionExamControllers = {
    async create(req, res) {
        const {
            exam_Id,
            question_Id,
            question_exam_score
        } = req.body

        if (!exam_Id || !question_Id || isNaN(+question_exam_score)) {
            return res.errorValid()
        }

        try {
            const newQuestionExam = await QuestionExamServices.create(
                {
                    exam_Id,
                    question_Id,
                    question_exam_score: +question_exam_score
                }
            )

            if (newQuestionExam) {
                return res.successNoData(
                    'Thêm mới câu hỏi vào bài thi thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới câu hỏi vào bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { exam, question } = req.query

        const { question_exam_score } = req.body

        if (!exam || !question || isNaN(+question_exam_score)) {
            return res.errorValid()
        }

        try {
            const questionExam = await QuestionExamServices.update(
                {
                    exam_Id: exam,
                    question_Id: question,
                    question_exam_score: +question_exam_score
                }
            )

            if (questionExam) {
                return res.successNoData(
                    'Cập nhật câu hỏi vào bài thi thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật câu hỏi vào bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, exam, question } = req.query

        if (!exam || !question) {
            return res.errorValid(
                'Id bài thi hoặc câu hỏi không tồn tại!'
            )
        }

        try {
            const questionExams = await QuestionExamServices.getAll({
                page, limit, exam, question
            })

            if (questionExams) {
                return res.success(
                    'Lấy tất cả câu hỏi vào bài thi thành công!',
                    questionExams
                )
            }

            return res.error(
                404,
                'Lấy tất cả câu hỏi vào bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { exam, question } = req.query

        if (!(exam || question)) {
            return res.errorValid(
                'Id bài thi hoặc câu hỏi không tồn tại!'
            )
        }

        try {
            const questionExam = await QuestionExamServices.delete({
                exam, question
            })

            if (questionExam) {
                return res.successNoData(
                    'Xóa câu hỏi vào bài thi thành công!'
                )
            }

            return res.error(
                404,
                'Xóa câu hỏi vào bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = QuestionExamControllers