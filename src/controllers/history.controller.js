const db = require("../models")
const AccountServices = require("../services/account.service")
const HistoryServices = require("../services/history.service")
const RechargeServices = require("../services/recharge.service")
const crypto = require('crypto');
const axios = require("axios")

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
            const account = await AccountServices.getOne({ account_Id: results.extraData })
            if (!account) {
                return res.error(404, 'Không tồn tại tài khoản!')
            }

            const updateAccount = await AccountServices.updateScore(
                recharge.recharge_score,
                { account_Id: account.account_Id }
            )

            const newHistory = await HistoryServices.create(
                {
                    recharge_Id: recharge.recharge_Id,
                    account_Id: updateAccount.account_Id,
                    history_createdAt: new Date()
                },
                transaction
            )

            if (updateAccount && newHistory) {
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
    },
    async checkStatus(req, res) {
        const { order } = req.params;

        if (!order) {
            return res.errorValid(
                'Id thanh toán không tồn tại!'
            )
        }

        try {
            const accessKey = process.env.MOMO_ACCESS_KEY;
            const secretKey = process.env.MOMO_SECRET_KEY;

            const rawSignature = `accessKey=${accessKey}&orderId=${order}&partnerCode=MOMO&requestId=${order}`;

            const signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');

            const requestBody = JSON.stringify({
                partnerCode: 'MOMO',
                requestId: order,
                orderId: order,
                signature: signature,
                lang: 'vi',
            });

            // options for axios
            const options = {
                method: 'POST',
                url: 'https://test-payment.momo.vn/v2/gateway/api/query',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: requestBody,
            };

            const { data } = await axios(options);
            if (!data) {
                return res.errorValid(
                    'Thanh toán thất bại!'
                )
            }

            return res.success(
                data.message,
                {
                    code: data.resultCode,
                }
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = HistoryControllers