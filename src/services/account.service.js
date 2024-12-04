const db = require("../models")

const AccountServices = {
    async create(account) {
        return await db.Account.create(account)
    },
    async getOne(params, isPassword = false) {
        return await db.Account.findOne({
            where: params,
            attributes: { exclude: !isPassword ? ['account_password'] : [] }
        })
    },
    async logout(account_Id) {
        const account = await db.Account.findOne({ where: { account_Id } })
        if (account) {
            account.account_token = null
            return await account.save()
        }
        return null
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const account_admin = typeof params.role !== 'undefined' ? JSON.parse(params.role) : undefined
        const account_band = typeof params.active !== 'undefined' ? JSON.parse(params.active) : undefined

        const where = {}
        if (typeof account_admin !== 'undefined') {
            where.account_admin = account_admin
        }

        if (typeof account_band !== 'undefined') {
            where.account_band = account_band
        }

        const check = {
            ...(Object.keys(where).length > 0 && { where }),
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Account.findAndCountAll(check)
    },
    async update(data, params, transaction) {
        const account_Id = params.account_Id
        const account_email = params.account_email
        const where = {}

        const account_admin = typeof data.account_admin !== 'undefined' ? JSON.parse(data.account_admin) : undefined
        const account_band = typeof data.account_band !== 'undefined' ? JSON.parse(data.account_band) : undefined

        if (account_Id) where.account_Id = account_Id
        if (account_email) where.account_email = account_email
        const account = {}
        if (data.account_password) {
            account.account_password = data.account_password
        }

        if (typeof account_admin !== 'undefined') {
            account.account_admin = account_admin
        }

        if (typeof account_band !== 'undefined') {
            account.account_band = account_band
        }

        if (data.account_name) {
            account.account_name = data.account_name
        }

        await db.Account.update(
            account,
            { where },
            transaction
        )

        return await db.Account.findOne({
            where,
            transaction
        })
    },
    async updateScore(account_score, params) {
        const account_Id = params.account_Id
        const account_email = params.account_email
        const where = {}

        if (account_Id) where.account_Id = account_Id
        if (account_email) where.account_email = account_email

        const account = await db.Account.findOne({
            where
        })

        if (account) {
            account.account_score += account_score
            return await account.save()
        }

        return null
    },
}

module.exports = AccountServices