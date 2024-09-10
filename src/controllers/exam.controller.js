const ExamServices = require("../services/exam.service")
const ApiError = require("../utils/constants/api-error")

const ExamControllers = {
    async create(req, res, next) {
        const {
            exam_title,
            exam_description,
            exam_total_score,
            exam_start_time,
            exam_limit,
            course_Id
        } = req.body

        if (!exam_title || !course_Id || !exam_start_time || isNaN(+exam_total_score)) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Thêm mới bài tập / bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới bài tập / bài thi thất bại!'
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
            exam_title,
            exam_description,
            exam_total_score,
            exam_start_time,
            exam_limit,
            course_Id
        } = req.body

        const { id } = req.params

        if (!exam_title || !id || !exam_start_time || isNaN(+exam_total_score)) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Cập nhật bài tập / bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật bài tập / bài thi thất bại!'
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
                'Id bài tập / bài thi không tồn tại!'
            ))
        }

        try {
            const exam = await ExamServices.getOne(id)

            if (exam) {
                return res.status(201).json({
                    data: exam,
                    message: 'Lấy bài tập / bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy bài tập / bài thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit } = req.query

        try {
            const exams = await ExamServices.getAll({
                page, limit
            })

            if (exams) {
                return res.status(201).json({
                    data: exams,
                    message: 'Lấy tất cả bài tập / bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả bài tập / bài thi thất bại!'
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
                'Id bài tập / bài thi không tồn tại!'
            ))
        }

        try {
            const exam = await ExamServices.delete(id)

            if (exam) {
                return res.status(200).json({
                    message: 'Xóa bài tập / bài thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa bài tập / bài thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = ExamControllers