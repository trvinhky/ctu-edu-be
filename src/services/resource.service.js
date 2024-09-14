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
    async update(resource, resource_Id) {
        return await db.Resource.update(
            resource,
            { where: { resource_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const lesson_Id = params.lesson ?? ''
        const category_Id = params.category ?? ''

        return await db.Resource.findAndCountAll({
            limit,
            offset,
            where: { lesson_Id, category_Id },
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