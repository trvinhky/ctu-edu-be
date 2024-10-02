const RoleServices = require("../services/role.service")

const RoleControllers = {
    async create(req, res) {
        const { role_name } = req.body

        if (!role_name) {
            return res.errorValid(
                'Tên role không tồn tại!'
            )
        }

        if (role_name && role_name.length > 15) {
            return res.errorValid(
                'Tên role quá dài (nhỏ hơn 15 kí tự)!'
            )
        }

        try {
            const newRole = await RoleServices.create({ role_name })

            if (newRole) {
                return res.successNoData(
                    'Thêm mới role thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới role thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params
        if (!id) {
            return res.errorValid(
                'Id role không tồn tại!'
            )
        }

        try {
            const role = await RoleServices.getOne({ role_Id: id })

            if (role) {
                return res.success(
                    'Lấy role thành công!',
                    role
                )
            }

            return res.error(
                404,
                'Lấy role thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getByName(req, res) {
        const { name } = req.params

        if (!name) {
            return res.errorValid(
                'Tên role không tồn tại!'
            )
        }

        try {
            const role = await RoleServices.getOne({ role_name: name })

            if (role) {
                return res.success(
                    'Lấy role thành công!',
                    role
                )
            }

            return res.error(
                404,
                'Lấy role thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { role_name } = req.body
        const { id } = req.params

        if (!role_name || !id) {
            return res.errorValid()
        }

        try {
            const role = await RoleServices.update({ role_name }, id)

            if (role) {
                returnres.successNoData(
                    'Cập nhật role thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật role thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, child } = req.query

        try {
            const roles = await RoleServices.getAll({
                page, limit, child
            })

            if (roles) {
                return res.success(
                    'Lấy tất cả role thành công!',
                    {
                        count: roles.count,
                        roles: roles.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả role thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = RoleControllers