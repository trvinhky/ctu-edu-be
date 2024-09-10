const EnrollmentServices = require("../services/enrollment.service")
const ApiError = require("../utils/constants/api-error")

const EnrollmentControllers = {
    async create(req, res, next) {
        const {
            course_Id,
            student_Id,
            enrollment_date
        } = req.body

        if (!student_Id || !course_Id || !enrollment_date) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newEnrollment = await EnrollmentServices.create(
                {
                    course_Id,
                    student_Id,
                    enrollment_date
                }
            )

            if (newEnrollment) {
                return res.status(200).json({
                    message: 'Thêm mới đăng ký khóa học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới đăng ký khóa học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, student, course } = req.query

        if (!(student || course)) {
            return next(new ApiError(
                400,
                'Id tài khoản hoặc khóa học không tồn tại!'
            ))
        }

        try {
            const courses = await EnrollmentServices.getAll({
                page, limit, student, course
            })

            if (courses) {
                return res.status(201).json({
                    data: courses,
                    message: 'Lấy tất cả đăng ký khóa học thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả đăng ký khóa học thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = EnrollmentControllers