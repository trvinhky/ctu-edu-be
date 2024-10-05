const db = require("../models")
const RechargeServices = require("../services/recharge.service")

const RechargeControllers = {
    async create(req, res) {
        const {
            recharge_money,
            recharge_score
        } = req.body

        if (isNaN(+recharge_money) || isNaN(+recharge_score)) {
            return res.errorValid()
        }

        try {
            const newRecharge = await RechargeServices.create(
                {
                    recharge_money: +recharge_money,
                    recharge_score: +recharge_score
                }
            )

            if (newRecharge) {
                return res.successNoData(
                    'Thêm mới gói nạp thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            recharge_money,
            recharge_score
        } = req.body
        const { id } = req.params

        if (!id || isNaN(+recharge_money) || isNaN(+recharge_score)) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const recharge = await RechargeServices.update(
                {
                    recharge_money: +recharge_money,
                    recharge_score: +recharge_score
                },
                id,
                transaction
            )

            if (recharge) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật gói nạp thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật gói nạp thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id gói nạp không tồn tại!'
            )
        }

        try {
            const recharge = await RechargeServices.getOne(id)

            if (recharge) {
                return res.success(
                    'Lấy gói nạp thành công!',
                    recharge
                )
            }

            return res.error(
                404,
                'Lấy gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const recharges = await RechargeServices.getAll({
                page, limit
            })

            if (recharges) {
                return res.success(
                    'Lấy tất cả gói nạp thành công!',
                    {
                        count: recharges.count,
                        recharges: recharges.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id gói nạp không tồn tại!'
            )
        }

        try {
            const recharge = await RechargeServices.delete(id)

            if (recharge) {
                return res.successNoData(
                    'Xóa gói nạp thành công!'
                )
            }

            return res.error(
                404,
                'Xóa gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = RechargeControllers