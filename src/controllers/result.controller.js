const ResultServices = require("../services/result.service")
const ApiError = require("../utils/constants/api-error")

const ResultControllers = {
    async create(req, res, next) {
        const {
            student_Id,
            exam_Id,
            result_score,
            result_completed
        } = req.body

        if (!student_Id || !exam_Id || !result_completed || isNaN(+result_score)) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newResult = await ResultServices.create(
                {
                    student_Id,
                    exam_Id,
                    result_score: +result_score,
                    result_completed
                }
            )

            if (newResult) {
                return res.status(200).json({
                    message: 'Thêm mới kết quả thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới kết quả thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, student, exam } = req.query

        if (!(student || exam)) {
            return next(new ApiError(
                400,
                'Id tài khoản hoặc bài thi không tồn tại!'
            ))
        }

        try {
            const exams = await ResultServices.getAll({
                page, limit, student, exam
            })

            if (exams) {
                return res.status(201).json({
                    data: exams,
                    message: 'Lấy tất cả kết quả thi thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả kết quả thi thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = ResultControllers