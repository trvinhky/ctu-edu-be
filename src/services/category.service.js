const db = require("../models")

const CategoryServices = {
    async create(category) {
        return await db.Category.create(category)
    },
    async getOne(category_Id) {
        return await db.Category.findOne({
            where: { category_Id },
            include: [
                {
                    model: db.Resource,
                    as: 'resources'
                },
                {
                    model: db.QuestionResource,
                    as: 'questions'
                }
            ]
        })
    },
    async update(category_name, category_Id) {
        const category = await db.Category.findOne(
            { where: { category_Id } }
        )

        if (category) {
            category.category_name = category_name
            return await category.save()
        }

        return null
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Category.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Resource,
                    as: 'resources'
                },
                {
                    model: db.QuestionResource,
                    as: 'questions'
                }
            ]
        })
    },
    async delete(category_Id) {
        return await db.Category.destroy({
            where: { category_Id }
        });
    }
}

module.exports = CategoryServices