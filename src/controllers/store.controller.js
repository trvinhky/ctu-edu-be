const StoreServices = require("../services/store.service")
const path = require('path');

const StoreControllers = {
    async create(req, res) {
        const { store_title } = req.body

        if (!store_title) {
            return res.errorValid(
                'Tên kho không hợp lệ!'
            )

        }

        try {
            let filePath
            if (req.file) {
                filePath = path.join('uploads', req.file.filename)
            }

            const newStore = await StoreServices.create({
                store_title,
                store_image: filePath ?? null
            })

            if (newStore) {
                return res.successNoData(
                    'Thêm mới kho thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params
        if (!id) {
            return res.errorValid(
                'Id kho không tồn tại!'
            )
        }

        try {
            const store = await StoreServices.getOne(id)

            if (store) {
                return res.success(
                    'Lấy kho thành công!',
                    store
                )
            }

            return res.error(
                404,
                'Lấy kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            store_title
        } = req.body
        const { id } = req.params

        if (!id || !store_title) {
            return res.errorValid()
        }

        try {
            let filePath
            if (req.file) {
                filePath = path.join('uploads', req.file.filename)
            }

            const data = {
                store_title,
                store_Id: id
            }

            if (filePath) {
                data.store_image = filePath
            }

            const store = await StoreServices.update(data)

            if (store) {
                return res.successNoData(
                    'Cập nhật kho thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, title } = req.query

        try {
            const stores = await StoreServices.getAll({
                page, limit, title
            })

            if (stores) {
                return res.success(
                    'Lấy tất cả kho thành công!',
                    {
                        count: stores.count,
                        stores: stores.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = StoreControllers