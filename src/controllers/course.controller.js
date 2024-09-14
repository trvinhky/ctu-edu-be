const CourseServices = require("../services/course.service")
const ApiError = require("../utils/constants/api-error")

const CourseControllers = {
    async create(req, res, next) {
        const {
            course_name,
            course_content,
            teacher_Id,
            course_image,
            subject_Id
        } = req.body

        if (!course_name || !course_content || !teacher_Id || !subject_Id) {
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
                    teacher_Id,
                    course_image: course_image ?? null,
                    subject_Id
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
            course_image,
            subject_Id,
            teacher_Id
        } = req.body
        const { id } = req.params

        if (!id || !course_name || !course_content || !subject_Id || !teacher_Id) {
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
                    subject_Id,
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
        const { page, limit, title, subject } = req.query

        try {
            const courses = await CourseServices.getAll({
                page, limit, title, subject
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