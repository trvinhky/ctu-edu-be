const db = require("../models")

const StoreServices = {
    async create(store) {
        return await db.Store.create(store)
    },
    async getOne(store_Id) {
        return await db.Store.findOne({
            where: { store_Id },
            include: [
                {
                    model: db.Document,
                    as: 'documents',
                    include: [
                        {
                            model: db.Format,
                            as: 'format'
                        }
                    ]
                }
            ]
        })
    },
    async update(data) {
        const store = await db.Store.findOne({
            where: { store_Id: data.store_Id },
        })

        if (store) {
            store.store_title = store_title
            return await store.save()
        }

        return null
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const store_title = params.title

        const where = {}
        if (store_title) {
            where.store_title = {
                [db.Sequelize.Op.like]: `%${store_title}%`
            }
        }

        const role = {
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.Document,
                    as: 'documents',
                    include: [
                        {
                            model: db.Format,
                            as: 'format'
                        }
                    ]
                }
            ]
        }

        if (params.page) {
            role.limit = limit
            role.offset = offset
        }

        return await db.Store.findAndCountAll(role)
    },
}

module.exports = StoreServices