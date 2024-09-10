const AnswerServices = require("../services/answer.service")
const ApiError = require("../utils/constants/api-error")

const AnswerControllers = {
    async create(req, res, next) {
        const {
            option_Id,
            student_Id,
            question_Id,
            answer_correct
        } = req.body

        if (!student_Id || !option_Id || !question_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Thêm mới câu trả lời thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới câu trả lời thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const {
            option_Id,
            student_Id,
            question_Id,
            answer_correct
        } = req.body
        const { id } = req.params

        if (!id || !option_Id || !student_Id || !question_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const answer = await AnswerServices.update(
                {
                    option_Id,
                    student_Id,
                    question_Id,
                    answer_correct: !!answer_correct
                },
                id
            )

            if (answer) {
                return res.status(200).json({
                    message: 'Cập nhật câu trả lời thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật câu trả lời thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, question, student, option } = req.query

        if (!(question || student || option)) {
            return next(new ApiError(
                400,
                'Id câu hỏi, học viên hoặc lựa chọn không tồn tại!'
            ))
        }

        try {
            const students = await AnswerServices.getAll({
                page, limit, question, student, option
            })

            if (students) {
                return res.status(201).json({
                    data: students,
                    message: 'Lấy tất cả câu trả lời thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả câu trả lời thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = AnswerControllers