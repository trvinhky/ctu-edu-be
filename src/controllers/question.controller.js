const QuestionServices = require("../services/question.service")

const QuestionControllers = {
    async create(req, res) {
        const {
            question_content,
            type_Id,
            auth_Id
        } = req.body

        if (!question_content || !type_Id || !auth_Id) {
            return res.errorValid()
        }

        try {
            const newQuestion = await QuestionServices.create(
                {
                    question_content,
                    type_Id,
                    auth_Id
                }
            )

            if (newQuestion) {
                return res.successNoData(
                    'Thêm mới câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            question_content,
            type_Id,
            auth_Id
        } = req.body

        const { id } = req.params

        if (!question_content || !type_Id || !id || !auth_Id) {
            return res.errorValid()
        }

        try {
            const question = await QuestionServices.update(
                {
                    question_content,
                    type_Id,
                    auth_Id
                },
                id
            )

            if (question) {
                return res.successNoData(
                    'Cập nhật câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id câu hỏi không tồn tại!'
            )
        }

        try {
            const question = await QuestionServices.getOne(id)

            if (question) {
                return res.success(
                    'Lấy câu hỏi thành công!',
                    question
                )
            }

            return res.error(
                404,
                'Lấy câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, id } = req.query

        try {
            const questions = await QuestionServices.getAll({
                page, limit, id
            })

            if (questions) {
                return res.success(
                    'Lấy tất cả câu hỏi thành công!',
                    questions
                )
            }

            return res.error(
                404,
                'Lấy tất cả câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id câu hỏi không tồn tại!'
            )
        }

        try {
            const question = await QuestionServices.delete(id)

            if (question) {
                return res.successNoData(
                    'Xóa câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Xóa câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = QuestionControllers