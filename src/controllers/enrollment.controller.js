const EnrollmentServices = require("../services/enrollment.service")

const EnrollmentControllers = {
    async create(req, res) {
        const {
            course_Id,
            student_Id
        } = req.body

        if (!student_Id || !course_Id) {
            return res.errorValid()
        }

        try {
            const newEnrollment = await EnrollmentServices.create(
                {
                    course_Id,
                    student_Id,
                    enrollment_date: new Date()
                }
            )

            if (newEnrollment) {
                return res.successNoData(
                    'Đăng ký khóa học thành công!'
                )
            }

            return res.error(
                404,
                'Đăng ký khóa học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, student, course } = req.query

        if (!(student || course)) {
            return res.errorValid(
                'Id tài khoản hoặc khóa học không tồn tại!'
            )
        }

        try {
            const courses = await EnrollmentServices.getAll({
                page, limit, student, course
            })

            if (courses) {
                return res.success(
                    'Lấy tất cả đăng ký khóa học thành công!',
                    courses
                )
            }

            return res.error(404, 'Lấy tất cả đăng ký khóa học thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = EnrollmentControllers