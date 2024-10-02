const db = require("../models")
const CourseServices = require("../services/course.service")
const path = require('path');

const CourseControllers = {
    async create(req, res) {
        const {
            course_name,
            course_content,
            teacher_Id,
            subject_Id
        } = req.body

        if (!course_name || !course_content || !teacher_Id || !subject_Id) {
            return res.errorValid()
        }

        try {
            let filePath
            if (req.file) {
                filePath = path.join('uploads', req.file.filename)
            }

            const newCourse = await CourseServices.create(
                {
                    course_name,
                    course_content,
                    teacher_Id,
                    course_image: filePath ?? null,
                    subject_Id
                }
            )

            if (newCourse) {
                return res.successNoData(
                    'Thêm mới khóa học thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới khóa học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            course_name,
            course_content,
            subject_Id,
            teacher_Id
        } = req.body
        const { id } = req.params

        if (!id || !course_name || !course_content || !subject_Id || !teacher_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            let filePath
            if (req.file) {
                filePath = path.join('uploads', req.file.filename)
            }

            const data = {
                course_name,
                course_content,
                subject_Id,
                teacher_Id
            }

            if (filePath) {
                data.course_image = filePath
            }

            const course = await CourseServices.update(
                data,
                id,
                transaction
            )

            if (course) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật khóa học thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật khóa học thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id khóa học không tồn tại!'
            )
        }

        try {
            const course = await CourseServices.getOne({ course_Id: id })

            if (course) {
                return res.success(
                    'Lấy khóa học thành công!',
                    course
                )
            }

            return res.error(
                404,
                'Lấy khóa học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, title, subject, teacher } = req.query

        try {
            const courses = await CourseServices.getAll({
                page, limit, title, subject, teacher
            })

            if (courses) {
                return res.success(
                    'Lấy tất cả khóa học thành công!',
                    {
                        count: courses.count,
                        courses: courses.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả khóa học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = CourseControllers