const db = require("../models")
const FormatServices = require("../services/format.service")

const FormatControllers = {
    async create(req, res) {
        const {
            format_name,
            format_accept,
            format_description
        } = req.body

        if (!format_name || !format_accept || !format_description) {
            return res.errorValid()
        }

        try {
            const newFormat = await FormatServices.create({
                format_name,
                format_accept,
                format_description
            })

            if (newFormat) {
                return res.successNoData(
                    'Thêm mới định dạng file thành công!'
                )
            }

            return res.error(404, 'Thêm mới định dạng file thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id định dạng file không tồn tại!'
            )
        }

        try {
            const format = await FormatServices.getOne(id)

            if (format) {
                return res.success(
                    'Lấy định dạng file thành công!',
                    format
                )
            }

            return res.error(404, 'Lấy định dạng file thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            format_name,
            format_accept,
            format_description
        } = req.body
        const { id } = req.params

        if (!id || !format_name || !format_accept || !format_description) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const format = await FormatServices.update(
                {
                    format_name,
                    format_accept,
                    format_description
                },
                id,
                transaction
            )

            if (format) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật định dạng file thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật định dạng file thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const formats = await FormatServices.getAll({
                page, limit
            })

            if (formats) {
                return res.success(
                    'Lấy tất cả định dạng file thành công!',
                    {
                        count: formats.count,
                        formats: formats.rows
                    }
                )
            }

            return res.error(404, 'Lấy tất cả định dạng file thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = FormatControllers