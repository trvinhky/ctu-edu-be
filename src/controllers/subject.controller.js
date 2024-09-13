const SubjectServices = require("../services/subject.service")
const ApiError = require("../utils/constants/api-error")

const SubjectControllers = {
    async create(req, res, next) {
        const { subject_name } = req.body

        if (!subject_name) {
            return next(new ApiError(
                400,
                'Tên môn học không được rỗng!'
            ))
        }

        try {
            const newSubject = await SubjectServices.create(
                { subject_name }
            )

            if (newSubject) {
                return res.status(200).json({
                    message: 'Thêm mới môn học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới môn học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const { subject_name } = req.body
        const { id } = req.params

        if (!id || !subject_name) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const subject = await SubjectServices.update(
                { subject_name },
                id
            )

            if (subject) {
                return res.status(200).json({
                    message: 'Cập nhật môn học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật môn học thất bại!'
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
                'Id môn học không tồn tại!'
            ))
        }

        try {
            const subject = await SubjectServices.getOne(id)

            if (subject) {
                return res.status(201).json({
                    data: subject,
                    message: 'Lấy môn học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy môn học thất bại!'
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
            const subjects = await SubjectServices.getAll({
                page, limit
            })

            if (subjects) {
                return res.status(201).json({
                    data: subjects,
                    message: 'Lấy tất cả môn học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả môn học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = SubjectControllers