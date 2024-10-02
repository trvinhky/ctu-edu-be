const db = require("../models")

const AccountServices = {
    async create(account) {
        return await db.Account.create({
            ...account,
            profile: [{
                profile_name: account.name,
                profile_score: 0
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
                },
                {
                    model: db.Role,
                    as: 'role'
                },
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
        const where = params.role ? { role_Id: params.role } : {}

        const check = {
            where,
            include: [
                {
                    model: db.Profile,
                    as: 'profile'
                },
                {
                    model: db.Role,
                    as: 'role'
                }
            ]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Account.findAndCountAll(check)
    },
    async update(account_password, params) {
        const account_Id = params.account_Id ?? ''
        const account_email = params.account_email ?? ''
        const account = await db.Account.findOne({ where: { account_Id, account_email } })
        if (account) {
            account.account_password = account_password
            return await account.save()
        }
        return null
    }
}

module.exports = AccountServices