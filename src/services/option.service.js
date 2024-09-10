const db = require("../models")

const OptionServices = {
    async create(option) {
        return await db.Option.create(option)
    },
    async getOne(option_Id) {
        return await db.Option.findOne({
            where: { option_Id },
            include: [
                {
                    model: db.Question,
                    as: 'question'
                }
            ]
        })
    },
    async update(option, option_Id) {
        return await db.Option.update(
            option,
            { where: { option_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Option.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Question,
                    as: 'question'
                }
            ]
        })
    },
    async delete(option_Id) {
        return await db.Option.destroy({
            where: { option_Id }
        });
    }
}

module.exports = OptionServices