const BuyServices = require("../services/buy.service")

const BuyControllers = {
    async create(req, res) {
        const {
            resource_Id,
            student_Id
        } = req.body

        if (!student_Id || !resource_Id) {
            return res.errorValid()
        }

        try {
            const newBuy = await BuyServices.create(
                {
                    resource_Id,
                    student_Id,
                    buy_date: new Date()
                }
            )

            if (newBuy) {
                return res.successNoData('Mua tài liệu thành công!')
            }

            return res.error(404, 'Mua tài liệu thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res, next) {
        const { page, limit, resource, student } = req.query

        if (!(resource || student)) {
            return res.errorValid(
                'Id tài khoản hoặc tài liệu không tồn tại!'
            )
        }

        try {
            const buy = await EnrollmentServices.getAll({
                page, limit, resource, student
            })

            if (buy) {
                return res.success(
                    'Lấy tất cả tài liệu đã mua thành công!',
                    buy
                )
            }

            return res.error('Lấy tất cả tài liệu đã mua thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = BuyControllers