const db = require("../models")

const RechargeServices = {
    async create(recharge, transaction) {
        return await db.Recharge.create(recharge, { transaction })
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
    async getOne(params) {
        const where = {}
        if (params.recharge_Id) {
            where.recharge_Id = params.recharge_Id
        }

        if (params.recharge_money) {
            where.recharge_money = +params.recharge_money
        }

        return await db.Recharge.findOne({
            where,
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        const role = {
            order: [['recharge_score', 'ASC']],
        }

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