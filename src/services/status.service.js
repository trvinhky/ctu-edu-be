const db = require("../models")

const StatusServices = {
    async create(status) {
        return await db.Status.create(status)
    },
    async getOne(status_Id) {
        return await db.Status.findOne({
            where: { status_Id },
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
            offset
        })
    },
    async delete(status_Id) {
        return await db.Status.destroy({
            where: { status_Id }
        });
    }
}

module.exports = StatusServices