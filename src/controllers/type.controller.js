const TypeServices = require("../services/type.service")
const { TYPE } = require("../utils/constants")
const ApiError = require("../utils/constants/api-error")

const TypeControllers = {
    async create(req, res, next) {
        const { type_name } = req.body

        if (!type_name || Object.values(TYPE).indexOf(type_name) === -1) {
            return next(new ApiError(
                400,
                'Tên kiểu câu hỏi không hợp lệ!'
            ))
        }

        try {
            const newType = await TypeServices.create({ type_name })

            if (newType) {
                return res.status(200).json({
                    message: 'Thêm mới kiểu câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới kiểu câu hỏi thất bại!'
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
                'Id kiểu câu hỏi không tồn tại!'
            ))
        }

        try {
            const type = await TypeServices.getOne(id)

            if (type) {
                return res.status(201).json({
                    data: type,
                    message: 'Lấy kiểu câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy kiểu câu hỏi thất bại!'
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
                    message: 'Lấy tất cả kiểu câu hỏi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả kiểu câu hỏi thất bại!'
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