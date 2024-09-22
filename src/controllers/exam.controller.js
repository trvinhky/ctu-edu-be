const ExamServices = require("../services/exam.service")

const ExamControllers = {
    async create(req, res) {
        const {
            exam_title,
            exam_description,
            exam_total_score,
            exam_start_time,
            exam_limit,
            course_Id
        } = req.body

        if (!exam_title || !course_Id || !exam_start_time || isNaN(+exam_total_score)) {
            return res.errorValid()
        }

        try {
            const newExam = await ExamServices.create(
                {
                    exam_title,
                    exam_description: exam_description ?? '',
                    exam_total_score: +exam_total_score,
                    exam_start_time,
                    exam_limit: isNaN(+exam_limit) ? 0 : +exam_limit,
                    course_Id
                }
            )

            if (newExam) {
                return res.successNoData(
                    'Thêm mới bài tập / bài thi thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới bài tập / bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            exam_title,
            exam_description,
            exam_total_score,
            exam_start_time,
            exam_limit,
            course_Id
        } = req.body

        const { id } = req.params

        if (!exam_title || !id || !exam_start_time || isNaN(+exam_total_score)) {
            return res.errorValid()
        }

        try {
            const exam = await ExamServices.update(
                {
                    exam_title,
                    exam_description: exam_description ?? '',
                    exam_total_score: +exam_total_score,
                    exam_start_time,
                    exam_limit: isNaN(+exam_limit) ? 0 : +exam_limit,
                    course_Id
                },
                id
            )

            if (exam) {
                return res.successNoData(
                    'Cập nhật bài tập / bài thi thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật bài tập / bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài tập / bài thi không tồn tại!'
            )
        }

        try {
            const exam = await ExamServices.getOne(id)

            if (exam) {
                return res.success(
                    'Lấy bài tập / bài thi thành công!',
                    exam
                )
            }

            return res.error(
                404,
                'Lấy bài tập / bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const exams = await ExamServices.getAll({
                page, limit
            })

            if (exams) {
                return res.success(
                    'Lấy tất cả bài tập / bài thi thành công!',
                    exams
                )
            }

            return res.error(
                404,
                'Lấy tất cả bài tập / bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài tập / bài thi không tồn tại!'
            )
        }

        try {
            const exam = await ExamServices.delete(id)

            if (exam) {
                return res.successNoData(
                    'Xóa bài tập / bài thi thành công!'
                )
            }

            return res.error(
                404,
                'Xóa bài tập / bài thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = ExamControllers