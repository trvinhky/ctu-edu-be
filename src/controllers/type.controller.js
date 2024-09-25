const TypeServices = require("../services/type.service")
const { TYPE } = require("../utils/constants")

const TypeControllers = {
    async create(req, res) {
        const { type_name } = req.body

        if (!type_name || Object.values(TYPE).indexOf(type_name) === -1) {
            return res.errorValid(
                'Tên kiểu câu hỏi không hợp lệ!'
            )
        }

        try {
            const newType = await TypeServices.create({ type_name })

            if (newType) {
                return res.successNoData(
                    'Thêm mới kiểu câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới kiểu câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params
        if (!id) {
            return res.errorValid(
                'Id kiểu câu hỏi không tồn tại!'
            )
        }

        try {
            const type = await TypeServices.getOne(id)

            if (type) {
                return res.success(
                    'Lấy kiểu câu hỏi thành công!',
                    type
                )
            }

            return res.error(
                404,
                'Lấy kiểu câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const types = await TypeServices.getAll({
                page, limit
            })

            if (types) {
                return res.success(
                    'Lấy tất cả kiểu câu hỏi thành công!',
                    {
                        count: types.count,
                        types: types.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả kiểu câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = TypeControllers