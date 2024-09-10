const TypeServices = require("../services/type.service")
const { TYPE } = require("../utils/constants")
const ApiError = require("../utils/constants/api-error")

const TypeControllers = {
    async create(req, res, next) {
        const { type_name } = req.body

        if (!type_name || Object.values(TYPE).indexOf(type_name) === -1) {
            return next(new ApiError(
                400,
                'Tên loại tài liệu không hợp lệ!'
            ))
        }

        try {
            const newType = await TypeServices.create({ type_name })

            if (newType) {
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
            const type = await TypeServices.getOne(id)

            if (type) {
                return res.status(201).json({
                    data: type,
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
    async getAll(req, res, next) {
        const { page, limit } = req.query

        try {
            const types = await TypeServices.getAll({
                page, limit
            })

            if (types) {
                return res.status(201).json({
                    data: types,
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

module.exports = TypeControllers