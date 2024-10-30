const BuyServices = require("../services/buy.service")
const db = require("../models")
const DocumentServices = require("../services/document.service")
const ProfileServices = require("../services/profile.service")

const BuyControllers = {
    async create(req, res) {
        const {
            account_Id,
            document_Id
        } = req.body

        if (!document_Id || !account_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {

            const document = await DocumentServices.getOne(document_Id)
            if (!document) {
                return res.error(404, 'Không tồn tại tài liệu!')
            }

            const profile = await ProfileServices.getOne(account_Id, false)
            if (!profile) {
                return res.error(404, 'Không tồn tại tài khoản!')
            }

            if (profile.profile_score < document.document_score) {
                return res.error(403, 'Mua thất bại! Số điểm không đủ!')
            }

            const updateInfo = await ProfileServices.update({
                profile_score: profile.profile_score - document.document_score
            }, profile.profile_Id, transaction)

            const newBuy = await BuyServices.create(
                {
                    account_Id,
                    document_Id,
                    buy_date: new Date()
                },
                transaction
            )

            if (newBuy && updateInfo) {
                await transaction.commit()
                return res.successNoData('Mua tài liệu thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Mua tài liệu thất bại!')
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { document, account } = req.query
        if (!document || !account) {
            return res.errorValid()
        }

        try {
            const buy = await BuyServices.getOne(account, document)

            if (buy) {
                return res.success(
                    'Đã mua tài liệu này!',
                    buy
                )
            }

            return res.error('Kiểm tra thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, account, document, title, score } = req.query

        if (!(account || document)) {
            return res.errorValid(
                'Id tài khoản hoặc tài liệu không tồn tại!'
            )
        }

        try {
            const buy = await BuyServices.getAll({
                page, limit, account, document, score, title
            })

            if (buy) {
                return res.success(
                    'Lấy tất cả tài liệu đã mua thành công!',
                    {
                        count: buy.count,
                        buy: buy.rows
                    }
                )
            }

            return res.error('Lấy tất cả tài liệu đã mua thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = BuyControllers