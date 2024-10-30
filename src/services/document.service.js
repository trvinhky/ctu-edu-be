const db = require("../models")

const DocumentServices = {
    async create(document) {
        return await db.Document.create(document)
    },
    async update(document, document_Id, transaction) {
        await db.Lesson.update(
            document,
            { where: { document_Id } },
            transaction
        )

        return await db.Document.findOne({
            where: { document_Id },
            transaction
        })
    },
    async getOne(document_Id) {
        return await db.Document.findOne({
            where: { document_Id },
            include: [
                {
                    model: db.Format,
                    as: 'format'
                },
                {
                    model: db.Store,
                    as: 'stores'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const document_score = isNaN(+params.score) && +params.score
        const format_Id = params.format
        const store_Id = params.store
        const title = params.title
        const where = {}

        if (document_score) where.document_score = { [db.Sequelize.Op.lte]: document_score }
        if (format_Id) where.format_Id = format_Id
        if (store_Id) where.store_Id = store_Id
        if (title) {
            where.document_title = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        const check = {
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.Format,
                    as: 'format'
                },
                {
                    model: db.Store,
                    as: 'store'
                }
            ]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Document.findAndCountAll(check)
    },
    async delete(document_Id) {
        return await db.Document.destroy({
            where: { document_Id }
        });
    }
}

module.exports = DocumentServices