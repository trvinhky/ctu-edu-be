const ResourceServices = require("../services/resource.service")
const path = require('path');
const fs = require('fs');

const ResourceControllers = {
    async create(req, res) {
        const { lesson_Id, category_Id, resource_score } = req.body

        if (!req.file || !lesson_Id || !category_Id || (resource_score && isNaN(+resource_score))) {
            return res.errorValid()
        }

        try {
            let filePath
            filePath = path.join('uploads', req.file.filename)
            const newResource = await ResourceServices.create({
                resource_url: filePath,
                lesson_Id,
                category_Id,
                resource_score: +resource_score ?? 0
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
                    {
                        count: resources.count,
                        resources: resources.rows
                    }
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
            const data = await ResourceServices.getOne(id)
            if (data) {
                const filePath = path.join(__dirname, '../' + data.resource_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const resource = await ResourceServices.delete(id)

                    if (resource) {
                        return res.successNoData(
                            'Xóa tài liệu thành công!'
                        )
                    }
                }
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