const db = require("../models")

const RechargeServices = {
    async create(recharge) {
        return await db.Recharge.create(recharge)
    },
    async update(recharge, recharge_Id, transaction) {
        await db.Recharge.update(
            recharge,
            { where: { recharge_Id } },
            transaction
        )

        return await db.Recharge.findOne({
            where: { recharge_Id },
            transaction
        })
    },
    async getOne(recharge_Id) {
        return await db.Recharge.findOne({
            where: { recharge_Id },
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        const role = {}

        if (params.page) {
            role.limit = limit
            role.offset = offset
        }

        return await db.Recharge.findAndCountAll(role)
    },
    async delete(recharge_Id) {
        return await db.Recharge.destroy({
            where: { recharge_Id }
        });
    }
}

module.exports = RechargeServices