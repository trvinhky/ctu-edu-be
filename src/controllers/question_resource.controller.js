const QuestionResourceServices = require("../services/question_resource.service")
const ApiError = require("../utils/constants/api-error")

const QuestionResourceControllers = {
    async create(req, res, next) {
        const {
            question_resource_url,
            category_Id,
            question_Id
        } = req.body

        if (!question_resource_url || !category_Id || !question_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newQuestionResource = await QuestionResourceServices.create(
                {
                    question_resource_url,
                    category_Id,
                    question_Id
                }
            )

            if (newQuestionResource) {
                return res.status(200).json({
                    message: 'Thêm mới tài nguyên câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới tài nguyên câu hỏi thất bại!'
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
            question_resource_url,
            category_Id,
            question_Id
        } = req.body

        const { id } = req.params

        if (!question_resource_url || !category_Id || !question_Id || !id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const questionResource = await QuestionResourceServices.update(
                {
                    question_resource_url,
                    category_Id,
                    question_Id
                },
                id
            )

            if (questionResource) {
                return res.status(200).json({
                    message: 'Cập nhật tài nguyên câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật tài nguyên câu hỏi thất bại!'
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
                'Id tài nguyên câu hỏi không tồn tại!'
            ))
        }

        try {
            const questionResource = await QuestionResourceServices.getOne(id)

            if (questionResource) {
                return res.status(201).json({
                    data: questionResource,
                    message: 'Lấy tài nguyên câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tài nguyên câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit } = req.query

        try {
            const questionResources = await QuestionResourceServices.getAll({
                page, limit
            })

            if (questionResources) {
                return res.status(201).json({
                    data: questionResources,
                    message: 'Lấy tất cả tài nguyên câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả tài nguyên câu hỏi thất bại!'
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
                'Id tài nguyên câu hỏi không tồn tại!'
            ))
        }

        try {
            const questionResource = await QuestionResourceServices.delete(id)

            if (questionResource) {
                return res.status(200).json({
                    message: 'Xóa tài nguyên câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa tài nguyên câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = QuestionResourceControllers