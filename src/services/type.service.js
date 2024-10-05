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
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        const check = {
            include: [
                {
                    model: db.Question,
                    as: 'questions'
                }
            ]
        }

        if (page) {
            check.limit = limit
            check.offset = offset
        }

        return await db.Type.findAndCountAll(check)
    },
}

module.exports = TypeServices