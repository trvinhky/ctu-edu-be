const ResultServices = require("../services/result.service")

const ResultControllers = {
    async create(req, res) {
        const {
            student_Id,
            exam_Id,
            result_completed
        } = req.body

        if (!student_Id || !exam_Id || !result_completed) {
            return res.errorValid()
        }

        try {
            const newResult = await ResultServices.create(
                {
                    student_Id,
                    exam_Id,
                    result_completed
                }
            )

            if (newResult) {
                return res.successNoData(
                    'Thêm mới kết quả thi thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới kết quả thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, student, exam } = req.query

        if (!(student || exam)) {
            return res.errorValid(
                'Id tài khoản hoặc bài thi không tồn tại!'
            )
        }

        try {
            const exams = await ResultServices.getAll({
                page, limit, student, exam
            })

            if (exams) {
                return res.success(
                    'Lấy tất cả kết quả thi thành công!',
                    exams
                )
            }

            return res.error(
                404,
                'Lấy tất cả kết quả thi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = ResultControllers