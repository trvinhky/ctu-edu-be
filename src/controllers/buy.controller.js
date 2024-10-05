const BuyServices = require("../services/buy.service")

const BuyControllers = {
    async create(req, res) {
        const {
            resource_Id,
            lesson_Id
        } = req.body

        if (!lesson_Id || !resource_Id) {
            return res.errorValid()
        }

        try {

            const newBuy = await BuyServices.create(
                {
                    resource_Id,
                    lesson_Id,
                    buy_date: new Date()
                }
            )

            if (newBuy) {
                return res.successNoData('Mua bài học thành công!')
            }

            return res.error(404, 'Mua bài học thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { lesson, student } = req.query
        if (!lesson || !student) {
            return res.errorValid()
        }

        try {
            const buy = await BuyServices.getOne(student, lesson)

            if (buy) {
                return res.success(
                    'Đã mua bài học này!',
                    buy
                )
            }

            return res.error('Kiểm tra thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, lesson, student } = req.query

        if (!(lesson || student)) {
            return res.errorValid(
                'Id tài khoản hoặc bài học không tồn tại!'
            )
        }

        try {
            const buy = await BuyServices.getAll({
                page, limit, lesson, student
            })

            if (buy) {
                return res.success(
                    'Lấy tất cả bài học đã mua thành công!',
                    buy
                )
            }

            return res.error('Lấy tất cả bài học đã mua thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = BuyControllers