const CourseServices = require("../services/course.service")
const ApiError = require("../utils/constants/api-error")

const CourseControllers = {
    async create(req, res, next) {
        const {
            course_name,
            course_content,
            course_total,
            teacher_Id,
            course_image,
            course_required,
            field_Id
        } = req.body

        if (!course_name || !course_content || !teacher_Id || !field_Id || isNaN(+course_total)) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newCourse = await CourseServices.create(
                {
                    course_name,
                    course_content,
                    course_total: parseInt(course_total),
                    teacher_Id,
                    course_required: course_required ?? null,
                    course_image: course_image ?? null,
                    field_Id
                }
            )

            if (newCourse) {
                return res.status(200).json({
                    message: 'Thêm mới khóa học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới khóa học thất bại!'
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
            course_name,
            course_content,
            course_total,
            course_image,
            course_required,
            field_Id,
            teacher_Id
        } = req.body
        const { id } = req.params

        if (!id || !course_name || !course_content || isNaN(+course_total) || !field_Id || !teacher_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const course = await CourseServices.update(
                {
                    course_name,
                    course_content,
                    course_total: parseInt(course_total),
                    field_Id,
                    course_required: course_required ?? null,
                    course_image: course_image ?? null,
                    teacher_Id
                },
                id
            )

            if (course) {
                return res.status(200).json({
                    message: 'Cập nhật khóa học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật khóa học thất bại!'
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
                'Id khóa học không tồn tại!'
            ))
        }

        try {
            const course = await CourseServices.getOne({ course_Id: id })

            if (course) {
                return res.status(201).json({
                    data: course,
                    message: 'Lấy khóa học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy khóa học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, title, field } = req.query

        try {
            const courses = await CourseServices.getAll({
                page, limit, title, field
            })

            if (courses) {
                return res.status(201).json({
                    data: courses,
                    message: 'Lấy tất cả khóa học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả khóa học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = CourseControllers