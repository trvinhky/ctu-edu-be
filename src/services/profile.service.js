const db = require("../models")

const ProfileServices = {
    async getOne(id, isProfile = true) {
        const where = {}
        if (isProfile) {
            where.profile_Id = id
        } else {
            where.account_Id = id
        }

        return await db.Profile.findOne({
            where
        })
    },
    async update(profile, id, transaction, isProfile = true) {
        const where = {}
        if (isProfile) {
            where.profile_Id = id
        } else {
            where.account_Id = id
        }
        await db.Profile.update(
            profile,
            { where },
            transaction
        )

        return await db.Profile.findOne({
            where,
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