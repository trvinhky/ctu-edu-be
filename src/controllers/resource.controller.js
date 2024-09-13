const ResourceServices = require("../services/resource.service")
const ApiError = require("../utils/constants/api-error")

const ResourceControllers = {
    async create(req, res, next) {
        const { resource_url, lesson_Id, category_Id } = req.body

        if (!resource_url || !lesson_Id || !category_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newResource = await ResourceServices.create({
                resource_url,
                lesson_Id,
                category_Id
            })

            if (newResource) {
                return res.status(200).json({
                    message: 'Thêm mới tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const { resource_url, lesson_Id, category_Id } = req.body
        const { id } = req.params

        if (!resource_url || !lesson_Id || !category_Id || !id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const resource = await ResourceServices.update({
                resource_url,
                lesson_Id,
                category_Id
            }, id)

            if (resource) {
                return res.status(200).json({
                    message: 'Cập nhật tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getOne(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(new ApiError(
                400,
                'Id tài liệu không tồn tại!'
            ))
        }

        try {
            const resource = await ResourceServices.getOne(id)

            if (resource) {
                return res.status(201).json({
                    data: role,
                    message: 'Lấy tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, type } = req.query

        try {
            const resources = await ResourceServices.getAll({
                page, limit, type
            })

            if (resources) {
                return res.status(201).json({
                    data: resources,
                    message: 'Lấy tất cả tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async delete(req, res, next) {
        const { id } = req.params

        if (!id) {
            return next(new ApiError(
                400,
                'Id tài liệu không tồn tại!'
            ))
        }

        try {
            const resource = await ResourceServices.delete(id)

            if (resource) {
                return res.status(200).json({
                    message: 'Xóa tài liệu thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa tài liệu thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = ResourceControllers