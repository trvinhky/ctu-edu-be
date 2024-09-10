const FieldServices = require("../services/field.service")
const ApiError = require("../utils/constants/api-error")

const FieldControllers = {
    async create(req, res, next) {
        const { field_name, field_description } = req.body

        if (!field_name) {
            return next(new ApiError(
                400,
                'Tên lĩnh vực không được rỗng!'
            ))
        }

        try {
            const newField = await FieldServices.create(
                {
                    field_name,
                    field_description: field_description ?? null
                }
            )

            if (newField) {
                return res.status(200).json({
                    message: 'Thêm mới lĩnh vực thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới lĩnh vực thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const { field_name, field_description } = req.body
        const { id } = req.params

        if (!id || !field_name) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const field = await FieldServices.update(
                {
                    field_name,
                    field_description: field_description ?? null
                },
                id
            )

            if (field) {
                return res.status(200).json({
                    message: 'Cập nhật lĩnh vực thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật lĩnh vực thất bại!'
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
                'Id lĩnh vực không tồn tại!'
            ))
        }

        try {
            const field = await FieldServices.getOne(id)

            if (field) {
                return res.status(201).json({
                    data: field,
                    message: 'Lấy lĩnh vực thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy lĩnh vực thất bại!'
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
            const fields = await FieldServices.getAll({
                page, limit
            })

            if (fields) {
                return res.status(201).json({
                    data: fields,
                    message: 'Lấy tất cả lĩnh vực thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả lĩnh vực thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = FieldControllers