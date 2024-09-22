const QuestionResourceServices = require("../services/question_resource.service")

const QuestionResourceControllers = {
    async create(req, res) {
        const {
            question_resource_url,
            category_Id,
            question_Id
        } = req.body

        if (!question_resource_url || !category_Id || !question_Id) {
            return res.errorValid()
        }

        try {
            const newQuestionResource = await QuestionResourceServices.create(
                {
                    question_resource_url,
                    category_Id,
                    question_Id
                }
            )

            if (newQuestionResource) {
                return res.successNoData(
                    'Thêm mới tài nguyên câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới tài nguyên câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            question_resource_url,
            category_Id,
            question_Id
        } = req.body

        const { id } = req.params

        if (!question_resource_url || !category_Id || !question_Id || !id) {
            return res.errorValid()
        }

        try {
            const questionResource = await QuestionResourceServices.update(
                {
                    question_resource_url,
                    category_Id,
                    question_Id
                },
                id
            )

            if (questionResource) {
                return res.successNoData(
                    'Cập nhật tài nguyên câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật tài nguyên câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id tài nguyên câu hỏi không tồn tại!'
            )
        }

        try {
            const questionResource = await QuestionResourceServices.getOne(id)

            if (questionResource) {
                return res.success(
                    'Lấy tài nguyên câu hỏi thành công!',
                    questionResource
                )
            }


            return res.error(
                404,
                'Lấy tài nguyên câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const questionResources = await QuestionResourceServices.getAll({
                page, limit
            })

            if (questionResources) {
                return res.success(
                    'Lấy tất cả tài nguyên câu hỏi thành công!',
                    questionResources
                )
            }

            return res.error(
                404,
                'Lấy tất cả tài nguyên câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id tài nguyên câu hỏi không tồn tại!'
            )
        }

        try {
            const questionResource = await QuestionResourceServices.delete(id)

            if (questionResource) {
                return res.successNoData(
                    'Xóa tài nguyên câu hỏi thành công!'
                )
            }

            return res.error(
                404,
                'Xóa tài nguyên câu hỏi thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = QuestionResourceControllers