const QuestionExamServices = require("../services/question_exam.service")
const ApiError = require("../utils/constants/api-error")

const QuestionExamControllers = {
    async create(req, res, next) {
        const {
            exam_Id,
            question_Id,
            question_exam_score
        } = req.body

        if (!exam_Id || !question_Id || isNaN(+question_exam_score)) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Thêm mới câu hỏi vào bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới câu hỏi vào bài thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const { exam, question } = req.query

        const { question_exam_score } = req.body

        if (!exam || !question || isNaN(+question_exam_score)) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Cập nhật câu hỏi vào bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật câu hỏi vào bài thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, exam, question } = req.query

        if (!exam || !question) {
            return next(new ApiError(
                400,
                'Id bài thi hoặc câu hỏi không tồn tại!'
            ))
        }

        try {
            const questionExams = await QuestionExamServices.getAll({
                page, limit, exam, question
            })

            if (questionExams) {
                return res.status(201).json({
                    data: questionExams,
                    message: 'Lấy tất cả câu hỏi vào bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả câu hỏi vào bài thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async delete(req, res, next) {
        const { exam, question } = req.query

        if (!(exam || question)) {
            return next(new ApiError(
                400,
                'Id bài thi và Id câu hỏi không tồn tại!'
            ))
        }

        try {
            const questionExams = await QuestionExamServices.delete({
                exam, question
            })

            if (questionExams) {
                return res.status(200).json({
                    message: 'Xóa câu hỏi vào bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa câu hỏi vào bài thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = QuestionExamControllers