const db = require("../models")

const StatusServices = {
    async create(status) {
        return await db.Status.create(status)
    },
    async getOne(params) {
        return await db.Status.findOne({
            where: params,
            include: [{
                model: db.Post,
                as: 'posts'
            }]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Status.findAndCountAll({
            limit,
            offset,
            include: [{
                model: db.Post,
                as: 'posts'
            }],
            distinct: true
        })
    }
}

module.exports = StatusServices