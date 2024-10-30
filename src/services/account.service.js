const db = require("../models")

const AccountServices = {
    async create(account) {
        return await db.Account.create({
            ...account,
            profile: [{
                profile_name: account.name,
                profile_score: 50
            }]
        }, {
            include: [{
                model: db.Profile,
                as: 'profile'
            }]
        })
    },
    async getOne(params, isPassword = false) {
        return await db.Account.findOne({
            where: params,
            attributes: { exclude: !isPassword ? ['account_password'] : [] },
            include: [
                {
                    model: db.Profile,
                    as: 'profile'
                }
            ]
        })
    },
    async setToken(account_email, refreshToken) {
        return await db.Account.update(
            {
                account_token: refreshToken
            },
            { where: { account_email } }
        )
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

        const where = {}
        if (typeof account_admin !== 'undefined') {
            where.account_admin = account_admin
        }

        const check = {
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.Profile,
                    as: 'profile'
                }
            ]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Account.findAndCountAll(check)
    },
    async update(data, params) {
        const account_Id = params.account_Id
        const account_email = params.account_email
        const where = {}

        if (account_Id) where.account_Id = account_Id
        if (account_email) where.account_email = account_email

        const account = await db.Account.findOne({ where: { account_Id, account_email } })
        if (account) {
            if (data.account_password) {
                account.account_password = data.account_password
            }
            if (typeof data.account_admin !== 'undefined') {
                account.account_admin = data.account_admin
            }
            return await account.save()
        }
        return null
    }
}

module.exports = AccountServices