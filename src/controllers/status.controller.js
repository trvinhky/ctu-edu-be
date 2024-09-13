const StatusServices = require("../services/status.service")
const { STATUS } = require("../utils/constants")
const ApiError = require("../utils/constants/api-error")

const StatusControllers = {
    async create(req, res, next) {
        const { status_name } = req.body

        if (!status_name || Object.values(STATUS).indexOf(status_name) === -1) {
            return next(new ApiError(
                400,
                'Tên trạng thái không hợp lệ!'
            ))
        }

        try {
            const newStatus = await StatusServices.create({ status_name })

            if (newStatus) {
                return res.status(200).json({
                    message: 'Thêm mới trạng thái thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới trạng thái thất bại!'
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
                'Id trạng thái không tồn tại!'
            ))
        }

        try {
            const status = await StatusServices.getOne({ status_Id: id })

            if (status) {
                return res.status(201).json({
                    data: status,
                    message: 'Lấy trạng thái thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy trạng thái thất bại!'
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
            const status = await StatusServices.getAll({
                page, limit
            })

            if (status) {
                return res.status(201).json({
                    data: status,
                    message: 'Lấy tất cả trạng thái thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả trạng thái thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = StatusControllers