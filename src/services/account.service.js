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
                account_token: refreshToken,
                account_active: true
            },
            { where: { account_email } }
        )
    },
    async logout(account_Id) {
        return await db.Account.update(
            {
                account_token: null,
                account_active: false
            },
            { where: { account_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const role_Id = params.role ?? ''

        return await db.Account.findAndCountAll({
            where: { role_Id },
            limit,
            offset,
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
        })
    }
}

module.exports = AccountServices