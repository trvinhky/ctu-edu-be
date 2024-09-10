const LessonServices = require("../services/lesson.service")
const ApiError = require("../utils/constants/api-error")

const LessonControllers = {
    async create(req, res, next) {
        const {
            lesson_title,
            lesson_content,
            course_Id
        } = req.body

        if (!lesson_title || !course_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newLesson = await LessonServices.create(
                {
                    lesson_title,
                    lesson_content: lesson_content ?? '',
                    course_Id
                }
            )

            if (newLesson) {
                return res.status(200).json({
                    message: 'Thêm mới bài học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới bài học thất bại!'
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
            lesson_title,
            lesson_content,
            course_Id
        } = req.body

        const { id } = req.params

        if (!lesson_title || !id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const lesson = await LessonServices.update(
                {
                    lesson_title,
                    lesson_content: lesson_content ?? '',
                    course_Id
                },
                id
            )

            if (lesson) {
                return res.status(200).json({
                    message: 'Cập nhật bài học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật bài học thất bại!'
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
                'Id bài học không tồn tại!'
            ))
        }

        try {
            const lesson = await LessonServices.getOne(id)

            if (lesson) {
                return res.status(201).json({
                    data: lesson,
                    message: 'Lấy bài học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy bài học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, id } = req.query

        try {
            const lessons = await LessonServices.getAll({
                page, limit, id
            })

            if (lessons) {
                return res.status(201).json({
                    data: lessons,
                    message: 'Lấy tất cả bài học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả bài học thất bại!'
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
                'Id bài học không tồn tại!'
            ))
        }

        try {
            const lesson = await LessonServices.delete(id)

            if (lesson) {
                return res.status(200).json({
                    message: 'Xóa bài học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa bài học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = LessonControllers