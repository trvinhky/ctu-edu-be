const db = require("../models")
const HistoryServices = require("../services/history.service")
const ProfileServices = require("../services/profile.service")
const RechargeServices = require("../services/recharge.service")

const HistoryControllers = {
    async create(req, res) {
        const {
            recharge_Id,
            account_Id
        } = req.body

        if (!recharge_Id || !account_Id) {
            return res.errorValid()
        }
        const transaction = await db.sequelize.transaction()

        try {
            const newHistory = await HistoryServices.create(
                {
                    recharge_Id,
                    account_Id,
                    history_createdAt: new Date()
                },
                transaction
            )

            if (newHistory) {
                await transaction.commit()
                return res.successNoData(
                    'Thêm mới lịch sử thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Thêm mới lịch sử thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, account, recharge } = req.query

        try {
            const histories = await HistoryServices.getAll({
                page, limit, account, recharge
            })

            if (histories) {
                return res.success(
                    'Lấy tất cả lịch sử thành công!',
                    {
                        count: histories.count,
                        histories: histories.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả lịch sử thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async changeScoreAccount(req, res) {
        const results = req.body
        /**
            resultCode = 0: giao dịch thành công.
            resultCode = 9000: giao dịch được cấp quyền (authorization) thành công .
            resultCode <> 0: giao dịch thất bại.
        */
        /**
         * Dựa vào kết quả này để update trạng thái đơn hàng
         * Kết quả log:
         * {
              partnerCode: 'MOMO',
              orderId: 'MOMO1712108682648', 
              requestId: 'MOMO1712108682648', 
              amount: 10000,
              orderInfo: 'pay with MoMo',
              orderType: 'momo_wallet',
              transId: 4014083433,
              resultCode: 0,
              message: 'Thành công.',
              payType: 'qr',
              responseTime: 1712108811069,
              extraData: '',
              signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
            }
        */

        if (!(results?.resultCode === 0 || results?.resultCode === 9000)) {
            return res.errorValid(
                'Thanh toán thất bại!'
            )
        }

        const transaction = await db.sequelize.transaction()

        try {
            const recharge = await RechargeServices.getOne({ recharge_money: results.amount })
            if (!recharge) {
                return res.error(
                    404,
                    'Có lỗi xảy ra! Gói nạp không tồn tại!'
                )
            }

            const profile = await ProfileServices.getOne(results.extraData, false)
            if (!profile) {
                return res.error(
                    404,
                    'Không tồn tại tài khoản!'
                )
            }

            const updateInfo = await ProfileServices.update({
                profile_score: profile.profile_score + recharge.recharge_score
            }, profile.profile_Id, transaction)

            const newHistory = await HistoryServices.create(
                {
                    recharge_Id: recharge.recharge_Id,
                    account_Id: updateInfo.account_Id,
                    history_createdAt: new Date()
                },
                transaction
            )

            if (updateInfo && newHistory) {
                await transaction.commit()
                return res.successNoData('Thanh toán thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Nạp điểm thất bại!')
        } catch (err) {
            console.log(err)
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getTotalMoney(req, res) {
        const { account } = req.query

        try {
            const totals = await HistoryServices.getTotalMoney({ account })

            if (totals) {
                let total = 0
                for (let i = 0; i < totals.length; i++) {
                    total += +totals[i]?.total
                }
                return res.success(
                    'Lấy tổng tiền thành công!',
                    total
                )
            }

            return res.error(
                404,
                'Lấy tổng tiền thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = HistoryControllers