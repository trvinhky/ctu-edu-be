const RoleServices = require("../services/role.service")
const ApiError = require("../utils/constants/api-error")

const RoleControllers = {
    async create(req, res, next) {
        const { role_name } = req.body

        if (!role_name) {
            return next(new ApiError(
                400,
                'Tên role không tồn tại!'
            ))
        }

        try {
            const newRole = await RoleServices.create({ role_name })

            if (newRole) {
                return res.status(200).json({
                    message: 'Thêm mới role thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới role thất bại!'
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
                'Id role không tồn tại!'
            ))
        }

        try {
            const role = await RoleServices.getOne({ role_Id: id })

            if (role) {
                return res.status(201).json({
                    data: role,
                    message: 'Lấy role thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy role thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getByName(req, res, next) {
        const { name } = req.params

        if (!name) {
            return next(new ApiError(
                400,
                'Tên role không tồn tại!'
            ))
        }

        try {
            const role = await RoleServices.getOne({ role_name: name })

            if (role) {
                return res.status(201).json({
                    data: role,
                    message: 'Lấy role thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy role thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit } = req.query

        try {
            const roles = await RoleServices.getAll({
                page, limit
            })

            if (roles) {
                return res.status(201).json({
                    data: roles,
                    message: 'Lấy tất cả role thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả role thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = RoleControllers