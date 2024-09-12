const db = require("../models")

const QuestionResourceServices = {
    async create(resource) {
        return await db.QuestionResource.create(resource)
    },
    async getOne(question_resource_Id) {
        return await db.QuestionResource.findOne({
            where: { question_resource_Id },
            include: [
                {
                    model: db.Category,
                    as: 'category'
                }
            ]
        })
    },
    async update(resource, question_resource_Id) {
        return await db.QuestionResource.update(
            resource,
            { where: { question_resource_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.QuestionResource.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Category,
                    as: 'category'
                }
            ]
        })
    },
    async delete(question_resource_Id) {
        return await db.QuestionResource.destroy({
            where: { question_resource_Id }
        });
    }
}

module.exports = QuestionResourceServices