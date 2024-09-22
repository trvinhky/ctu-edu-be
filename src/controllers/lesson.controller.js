const LessonServices = require("../services/lesson.service")

const LessonControllers = {
    async create(req, res) {
        const {
            lesson_title,
            lesson_content,
            course_Id
        } = req.body

        if (!lesson_title || !course_Id) {
            return res.errorValid()
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
            course_Id
        } = req.body

        const { id } = req.params

        if (!lesson_title || !id) {
            return res.errorValid()
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
                return res.successNoData(
                    'Cập nhật bài học thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật bài học thất bại!'
            )
        } catch (err) {
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
                    lessons
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
            const lesson = await LessonServices.delete(id)

            if (lesson) {
                return res.successNoData(
                    'Xóa bài học thành công!'
                )
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