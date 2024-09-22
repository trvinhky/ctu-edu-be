const StatusServices = require("../services/status.service")
const { STATUS } = require("../utils/constants")

const StatusControllers = {
    async create(req, res) {
        const { status_name } = req.body

        if (!status_name || Object.values(STATUS).indexOf(status_name) === -1) {
            return res.errorValid(
                'Tên trạng thái không hợp lệ!'
            )

        }

        try {
            const newStatus = await StatusServices.create({ status_name })

            if (newStatus) {
                return res.successNoData(
                    'Thêm mới trạng thái thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới trạng thái thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params
        if (!id) {
            return res.errorValid(
                'Id trạng thái không tồn tại!'
            )
        }

        try {
            const status = await StatusServices.getOne({ status_Id: id })

            if (status) {
                return res.success(
                    'Lấy trạng thái thành công!',
                    status
                )
            }

            return res.error(
                404,
                'Lấy trạng thái thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const status = await StatusServices.getAll({
                page, limit
            })

            if (status) {
                return res.success(
                    'Lấy tất cả trạng thái thành công!',
                    status
                )
            }

            return res.error(
                404,
                'Lấy tất cả trạng thái thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = StatusControllers