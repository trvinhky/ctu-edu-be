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
                    model: db.Lesson,
                    as: 'lessons'
                },
                {
                    model: db.Question,
                    as: 'questions'
                }
            ]
        })
    },
    async update(category, category_Id, transaction) {
        await db.Category.update(
            category,
            { where: { category_Id } },
            transaction
        )

        return await db.Category.findOne({
            where: { category_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        const check = {
            include: [
                {
                    model: db.Lesson,
                    as: 'lessons'
                },
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

        return await db.Category.findAndCountAll(check)
    },
    async delete(category_Id) {
        return await db.Category.destroy({
            where: { category_Id }
        });
    }
}

module.exports = CategoryServices