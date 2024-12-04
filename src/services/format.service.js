const db = require("../models")

const FormatServices = {
    async create(format) {
        return await db.Format.create(format)
    },
    async getOne(format_Id) {
        return await db.Format.findOne({
            where: { format_Id },
            include: [
                {
                    model: db.Document,
                    as: 'documents'
                },
                {
                    model: db.Post,
                    as: 'posts'
                }
            ]
        })
    },
    async update(format, format_Id, transaction) {
        await db.Format.update(
            format,
            { where: { format_Id } },
            transaction
        )

        return await db.Format.findOne({
            where: { format_Id },
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
                    model: db.Document,
                    as: 'documents'
                },
                {
                    model: db.Post,
                    as: 'posts'
                }
            ],
            distinct: true
        }

        if (page) {
            check.limit = limit
            check.offset = offset
        }

        return await db.Format.findAndCountAll(check)
    },
    async delete(format_Id) {
        return await db.Format.destroy({
            where: { format_Id }
        });
    }
}

module.exports = FormatServices