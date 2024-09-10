const db = require("../models")

const FieldServices = {
    async create(field) {
        return await db.Field.create(field)
    },
    async update(field, field_Id) {
        return await db.Field.update(
            field,
            { where: { field_Id } }
        )
    },
    async getOne(field_Id) {
        return await db.Field.findOne({
            where: { field_Id },
            include: [{
                model: db.Course,
                as: 'courses'
            }]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Field.findAndCountAll({
            limit,
            offset
        })
    }
}

module.exports = FieldServices