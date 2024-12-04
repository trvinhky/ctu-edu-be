const db = require("../models")

const DocumentServices = {
    async create(document) {
        return await db.Document.create(document)
    },
    async update(document, document_Id, transaction) {
        await db.Document.update(
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
                    as: 'store'
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
        const auth = params.auth
        const year = params.year
        const document_Id = params.id
        const order = params.order; // sắp xếp giảm dần
        const where = {}
        const orderCheck = [];

        if (document_score) where.document_score = { [db.Sequelize.Op.lte]: document_score }
        if (format_Id) where.format_Id = format_Id
        if (store_Id) where.store_Id = store_Id
        if (!isNaN(+year)) where.document_year = +year
        if (title) {
            where.document_title = {
                [db.Sequelize.Op.like]: `%${title}%`
            }
        }

        if (auth) {
            where.document_author = {
                [db.Sequelize.Op.like]: `%${auth}%`
            }
        }

        if (document_Id) {
            where.document_Id = {
                [db.Sequelize.Op.ne]: document_Id
            }
        }

        if (["desc", "asc"].includes(order)) {
            orderCheck.push(["document_score", order.toUpperCase()]);
        } else {
            orderCheck.push(["createdAt", "DESC"]);
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
            ],
            distinct: true,
            order: [orderCheck]
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