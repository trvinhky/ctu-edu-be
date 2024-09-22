const ResourceServices = require("../services/resource.service")

const ResourceControllers = {
    async create(req, res) {
        const { resource_url, lesson_Id, category_Id } = req.body

        if (!resource_url || !lesson_Id || !category_Id) {
            return res.errorValid()
        }

        try {
            const newResource = await ResourceServices.create({
                resource_url,
                lesson_Id,
                category_Id
            })

            if (newResource) {
                return res.successNoData(
                    'Thêm mới tài liệu thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { resource_url, lesson_Id, category_Id } = req.body
        const { id } = req.params

        if (!resource_url || !lesson_Id || !category_Id || !id) {
            return res.errorValid()
        }

        try {
            const resource = await ResourceServices.update({
                resource_url,
                lesson_Id,
                category_Id
            }, id)

            if (resource) {
                return res.successNoData(
                    'Cập nhật tài liệu thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params
        if (!id) {
            return res.errorValid(
                'Id tài liệu không tồn tại!'
            )
        }

        try {
            const resource = await ResourceServices.getOne(id)

            if (resource) {
                return res.success(
                    'Lấy tài liệu thành công!',
                    resource
                )
            }

            return res.error(
                404,
                'Lấy tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, lesson } = req.query

        try {
            const resources = await ResourceServices.getAll({
                page, limit, lesson
            })

            if (resources) {
                return res.success(
                    'Lấy tất cả tài liệu thành công!',
                    resources
                )
            }

            return res.error(
                404,
                'Lấy tất cả tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id tài liệu không tồn tại!'
            )
        }

        try {
            const resource = await ResourceServices.delete(id)

            if (resource) {
                return res.successNoData(
                    'Xóa tài liệu thành công!'
                )
            }

            return res.error(
                404,
                'Xóa tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async downloadFile() {

    }
}

module.exports = ResourceControllers