const db = require("../models")

const CategoryServices = {
    async create(category) {
        return await db.Category.create(category)
    },
    async getOne(category_Id) {
        return await db.Category.findOne({
            where: { category_Id },
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

        return await db.Category.findAndCountAll({
            limit,
            offset
        })
    },
}

module.exports = CategoryServices