const OptionServices = require("../services/option.service")
const ApiError = require("../utils/constants/api-error")

const OptionControllers = {
    async create(req, res, next) {
        const {
            option_content,
            option_is_correct,
            question_Id
        } = req.body

        if (!option_content || !question_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Thêm mới lựa chọn thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới lựa chọn thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const {
            option_content,
            option_is_correct,
            question_Id
        } = req.body

        const { id } = req.params

        if (!option_content || !id || !question_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Cập nhật lựa chọn thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật lựa chọn thất bại!'
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
                'Id lựa chọn không tồn tại!'
            ))
        }

        try {
            const option = await OptionServices.getOne(id)

            if (option) {
                return res.status(201).json({
                    data: option,
                    message: 'Lấy lựa chọn thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy lựa chọn thất bại!'
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
            const options = await OptionServices.getAll({
                page, limit
            })

            if (options) {
                return res.status(201).json({
                    data: options,
                    message: 'Lấy tất cả lựa chọn thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả lựa chọn thất bại!'
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
                'Id lựa chọn không tồn tại!'
            ))
        }

        try {
            const option = await OptionServices.delete(id)

            if (option) {
                return res.status(200).json({
                    message: 'Xóa lựa chọn thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa lựa chọn thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = OptionControllers