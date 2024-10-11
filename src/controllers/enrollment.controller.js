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
        const { page, limit, student, course, title, subject } = req.query

        if (!(student || course)) {
            return res.errorValid(
                'Id tài khoản hoặc khóa học không tồn tại!'
            )
        }

        try {
            const enrollments = await EnrollmentServices.getAll({
                page, limit, student, course, title, subject
            })

            if (enrollments) {
                return res.success(
                    'Lấy tất cả khóa học đăng ký thành công!',
                    {
                        count: enrollments.count,
                        enrollments: enrollments.rows
                    }
                )
            }

            return res.error(404, 'Lấy tất cả khóa học đăng ký thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { student, course } = req.query

        if (!student || !course) {
            return res.errorValid()
        }

        try {
            const enrollment = await EnrollmentServices.delete(
                student,
                course
            )

            if (enrollment) {
                return res.successNoData(
                    'Rời lớp học thành công!'
                )
            }

            return res.error(
                404,
                'Rời lớp học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = EnrollmentControllers