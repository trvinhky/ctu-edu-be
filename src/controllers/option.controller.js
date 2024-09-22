const OptionServices = require("../services/option.service")

const OptionControllers = {
    async create(req, res) {
        const {
            option_content,
            option_is_correct,
            question_Id
        } = req.body

        if (!option_content || !question_Id) {
            return res.errorValid()
        }

        try {
            const newOption = await OptionServices.create(
                {
                    option_content,
                    option_is_correct: !!option_is_correct,
                    question_Id
                }
            )

            if (newOption) {
                return res.successNoData(
                    'Thêm mới lựa chọn thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            option_content,
            option_is_correct,
            question_Id
        } = req.body

        const { id } = req.params

        if (!option_content || !id || !question_Id) {
            return res.errorValid()
        }

        try {
            const option = await OptionServices.update(
                {
                    option_content,
                    option_is_correct: !!option_is_correct,
                    question_Id
                },
                id
            )

            if (option) {
                return res.successNoData(
                    'Cập nhật lựa chọn thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id lựa chọn không tồn tại!'
            )
        }

        try {
            const option = await OptionServices.getOne(id)

            if (option) {
                return res.success(
                    'Lấy lựa chọn thành công!',
                    option
                )
            }

            return res.error(
                404,
                'Lấy lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const options = await OptionServices.getAll({
                page, limit
            })

            if (options) {
                return res.success(
                    'Lấy tất cả lựa chọn thành công!',
                    options
                )
            }

            return res.error(
                404,
                'Lấy tất cả lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id lựa chọn không tồn tại!'
            )
        }

        try {
            const option = await OptionServices.delete(id)

            if (option) {
                return res.successNoData(
                    'Xóa lựa chọn thành công!'
                )
            }

            return res.error(
                404,
                'Xóa lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = OptionControllers