const BuyServices = require("../services/buy.service")
const ApiError = require("../utils/constants/api-error")

const BuyControllers = {
    async create(req, res, next) {
        const {
            resource_Id,
            student_Id,
            buy_date
        } = req.body

        if (!student_Id || !resource_Id || !buy_date) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newBuy = await BuyServices.create(
                {
                    resource_Id,
                    student_Id,
                    buy_date
                }
            )

            if (newBuy) {
                return res.status(200).json({
                    message: 'Mua tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Mua tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, resource, course } = req.query

        if (!(resource || course)) {
            return next(new ApiError(
                400,
                'Id tài khoản hoặc tài liệu không tồn tại!'
            ))
        }

        try {
            const buy = await EnrollmentServices.getAll({
                page, limit, resource, course
            })

            if (buy) {
                return res.status(201).json({
                    data: buy,
                    message: 'Lấy tất cả tài liệu đã mua thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả tài liệu đã mua thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = BuyControllers