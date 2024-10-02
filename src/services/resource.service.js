const db = require("../models")

const ResourceServices = {
    async create(resource) {
        return await db.Resource.create(resource)
    },
    async getOne(resource_Id) {
        return await db.Resource.findOne({
            where: { resource_Id },
            include: [{
                model: db.Category,
                as: 'category'
            }]
        })
    },
    async update(resource, resource_Id, transaction) {
        await db.Resource.update(
            resource,
            { where: { resource_Id } },
            transaction
        )

        return await db.Resource.findOne({
            where: { resource_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const lesson_Id = params.lesson ?? ''
        const where = {}
        if (lesson_Id) where.lesson_Id = lesson_Id

        return await db.Resource.findAndCountAll({
            limit,
            offset,
            where,
            include: [{
                model: db.Category,
                as: 'category'
            }]
        })
    },
    async delete(resource_Id) {
        return await db.Resource.destroy({
            where: { resource_Id }
        });
    }
}

module.exports = ResourceServices