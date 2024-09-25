const CategoryServices = require("../services/category.service")

const CategoryControllers = {
    async create(req, res) {
        const { category_name } = req.body

        if (!category_name) {
            return res.errorValid(
                'Tên loại tài liệu không tồn tại!'
            )
        }

        try {
            const newCategory = await CategoryServices.create(
                { category_name }
            )

            if (newCategory) {
                return res.successNoData(
                    'Thêm mới loại tài liệu thành công!'
                )
            }

            return res.error(404, 'Thêm mới loại tài liệu thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id loại tài liệu không tồn tại!'
            )
        }

        try {
            const category = await CategoryServices.getOne(id)

            if (category) {
                return res.success(
                    'Lấy loại tài liệu thành công!',
                    category
                )
            }

            return res.error(404, 'Lấy loại tài liệu thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            category_name
        } = req.body
        const { id } = req.params

        if (!id || !category_name) {
            return res.errorValid()
        }

        try {
            const category = await CategoryServices.update(
                category_name,
                id
            )

            if (category) {
                return res.successNoData(
                    'Cập nhật loại tài liệu thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật loại tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const categories = await CategoryServices.getAll({
                page, limit
            })

            if (categories) {
                return res.success(
                    'Lấy tất cả loại tài liệu thành công!',
                    {
                        count: categories.count,
                        categories: categories.rows
                    }
                )
            }

            return res.error(404, 'Lấy tất cả loại tài liệu thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = CategoryControllers