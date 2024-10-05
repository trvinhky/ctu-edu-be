const db = require("../models");
const BuyServices = require("../services/buy.service");
const LessonServices = require("../services/lesson.service")
const path = require('path');
const fs = require('fs');

const LessonControllers = {
    async create(req, res) {
        const {
            lesson_title,
            lesson_content,
            course_Id,
            lesson_score,
            category_Id
        } = req.body

        if (!lesson_title || !course_Id || isNaN(+lesson_score) || !category_Id || !req.file) {
            return res.errorValid()
        }

        try {
            let filePath
            filePath = path.join('uploads', req.file.filename)

            const newLesson = await LessonServices.create(
                {
                    lesson_title,
                    lesson_content: lesson_content ?? '',
                    course_Id,
                    lesson_score: +lesson_score,
                    category_Id,
                    lesson_url: filePath
                }
            )

            if (newLesson) {
                return res.successNoData(
                    'Thêm mới bài học thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới bài học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            lesson_title,
            lesson_content,
            course_Id,
            lesson_score
        } = req.body

        const { id } = req.params

        if (!lesson_title || !id || isNaN(+lesson_score)) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()
        try {

            const lesson = await LessonServices.update(
                {
                    lesson_title,
                    lesson_content: lesson_content ?? '',
                    course_Id,
                    lesson_score: +lesson_score,
                },
                id,
                transaction
            )

            if (lesson) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật bài học thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật bài học thất bại!'
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
                'Id bài học không tồn tại!'
            )
        }

        try {
            const lesson = await LessonServices.getOne(id)

            if (lesson) {
                return res.success(
                    'Lấy bài học thành công!',
                    lesson
                )
            }

            return res.error(
                404,
                'Lấy bài học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, id } = req.query

        try {
            const lessons = await LessonServices.getAll({
                page, limit, id
            })

            if (lessons) {
                return res.success(
                    'Lấy tất cả bài học thành công!',
                    {
                        count: lessons.count,
                        lessons: lessons.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả bài học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài học không tồn tại!'
            )
        }

        try {
            const checkValid = await BuyServices.getAll({
                lesson: id
            })

            if (checkValid) {
                return res.errorValid(
                    'Bài học không thể xóa!'
                )
            }

            const data = await LessonServices.getOne(id)

            if (data) {
                const filePath = path.join(__dirname, '../' + data.lesson_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const lesson = await LessonServices.delete(id)

                    if (lesson) {
                        return res.successNoData(
                            'Xóa bài học thành công!'
                        )
                    }
                }
            }

            return res.error(
                404,
                'Xóa bài học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = LessonControllers