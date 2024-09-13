const db = require("../models")

const ProfileServices = {
    async getOne(profile_Id) {
        return await db.Profile.findOne({
            where: { profile_Id }
        })
    },
    async update(profile, profile_Id) {
        return await db.Profile.update(
            profile,
            { where: { profile_Id } }
        )
    },
    async recharge(profile_score, account_Id) {
        return await db.Profile.update(
            { profile_score },
            { where: { account_Id } }
        )
    }
}

module.exports = ProfileServices