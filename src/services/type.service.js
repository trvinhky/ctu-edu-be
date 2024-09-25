const db = require("../models")

const TypeServices = {
    async create(type) {
        return await db.Type.create(type)
    },
    async getOne(type_Id) {
        return await db.Type.findOne({
            where: { type_Id },
            include: [{
                model: db.Question,
                as: 'questions'
            }]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Type.findAndCountAll({
            limit,
            offset,
            include: [{
                model: db.Question,
                as: 'questions'
            }]
        })
    },
}

module.exports = TypeServices