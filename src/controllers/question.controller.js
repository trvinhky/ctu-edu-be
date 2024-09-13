const QuestionServices = require("../services/question.service")
const ApiError = require("../utils/constants/api-error")

const QuestionControllers = {
    async create(req, res, next) {
        const {
            question_content,
            type_Id,
            auth_Id
        } = req.body

        if (!question_content || !type_Id || !auth_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newQuestion = await QuestionServices.create(
                {
                    question_content,
                    type_Id,
                    auth_Id
                }
            )

            if (newQuestion) {
                return res.status(200).json({
                    message: 'Thêm mới câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới câu hỏi thất bại!'
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
            question_content,
            type_Id,
            auth_Id
        } = req.body

        const { id } = req.params

        if (!question_content || !type_Id || !id || !auth_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const question = await QuestionServices.update(
                {
                    question_content,
                    type_Id,
                    auth_Id
                },
                id
            )

            if (question) {
                return res.status(200).json({
                    message: 'Cập nhật câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getOne(req, res, next) {
        const { id } = req.params

        if (!id) {
            return next(new ApiError(
                400,
                'Id câu hỏi không tồn tại!'
            ))
        }

        try {
            const question = await QuestionServices.getOne(id)

            if (question) {
                return res.status(201).json({
                    data: question,
                    message: 'Lấy câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, id } = req.query

        try {
            const questions = await QuestionServices.getAll({
                page, limit, id
            })

            if (questions) {
                return res.status(201).json({
                    data: questions,
                    message: 'Lấy tất cả câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async delete(req, res, next) {
        const { id } = req.params

        if (!id) {
            return next(new ApiError(
                400,
                'Id câu hỏi không tồn tại!'
            ))
        }

        try {
            const question = await QuestionServices.delete(id)

            if (question) {
                return res.status(200).json({
                    message: 'Xóa câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = QuestionControllers