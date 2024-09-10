const CategoryServices = require("../services/category.service")
const { CATEGORY } = require("../utils/constants")
const ApiError = require("../utils/constants/api-error")

const CategoryControllers = {
    async create(req, res, next) {
        const { category_name } = req.body

        if (!category_name || Object.values(CATEGORY).indexOf(category_name) === -1) {
            return next(new ApiError(
                400,
                'Tên loại câu hỏi không hợp lệ!'
            ))
        }

        try {
            const newCategory = await CategoryServices.create(
                { category_name }
            )

            if (newCategory) {
                return res.status(200).json({
                    message: 'Thêm mới loại câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới loại câu hỏi thất bại!'
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
                'Id loại câu hỏi không tồn tại!'
            ))
        }

        try {
            const category = await CategoryServices.getOne(id)

            if (category) {
                return res.status(201).json({
                    data: category,
                    message: 'Lấy loại câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy loại câu hỏi thất bại!'
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
            const categories = await CategoryServices.getAll({
                page, limit
            })

            if (categories) {
                return res.status(201).json({
                    data: categories,
                    message: 'Lấy tất cả loại câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả loại câu hỏi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = CategoryControllers