const db = require("../models")

const ProfileServices = {
    async getOne(profile_Id) {
        return await db.Profile.findOne({
            where: { profile_Id }
        })
    },
    async update(profile, profile_Id, transaction) {
        await db.Profile.update(
            profile,
            { where: { profile_Id } },
            transaction
        )

        return await db.Profile.findOne({
            where: { profile_Id },
            transaction
        })
    },
    async recharge(profile_score, account_Id) {
        const profile = await this.getOne(account_Id)
        if (profile) {
            profile.profile_score = profile_score
            return await profile.save()
        }

        return null
    }
}

module.exports = ProfileServices