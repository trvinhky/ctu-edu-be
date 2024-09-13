const CategoryServices = require("../services/category.service")
const ApiError = require("../utils/constants/api-error")

const CategoryControllers = {
    async create(req, res, next) {
        const { category_name } = req.body

        if (!category_name) {
            return next(new ApiError(
                400,
                'Tên loại tài liệu không tồn tại!'
            ))
        }

        try {
            const newCategory = await CategoryServices.create(
                { category_name }
            )

            if (newCategory) {
                return res.status(200).json({
                    message: 'Thêm mới loại tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới loại tài liệu thất bại!'
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
                'Id loại tài liệu không tồn tại!'
            ))
        }

        try {
            const category = await CategoryServices.getOne(id)

            if (category) {
                return res.status(201).json({
                    data: category,
                    message: 'Lấy loại tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy loại tài liệu thất bại!'
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
            category_name
        } = req.body
        const { id } = req.params

        if (!id || !category_name) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const category = await CategoryServices.update(
                {
                    category_name
                },
                id
            )

            if (category) {
                return res.status(200).json({
                    message: 'Cập nhật loại tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật loại tài liệu thất bại!'
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
                    message: 'Lấy tất cả loại tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả loại tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = CategoryControllers