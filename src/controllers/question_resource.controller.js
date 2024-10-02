const QuestionResourceServices = require("../services/question_resource.service")
const path = require('path');
const fs = require('fs');

const QuestionResourceControllers = {
    async create(req, res) {
        const {
            category_Id,
            question_Id
        } = req.body

        if (!category_Id || !question_Id || !req.file) {
            return res.errorValid()
        }

        try {
            let filePath
            filePath = path.join('uploads', req.file.filename)

            const newQuestionResource = await QuestionResourceServices.create(
                {
                    question_resource_url: filePath,
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
        const { page, limit, question } = req.query

        try {
            const questionResources = await QuestionResourceServices.getAll({
                page, limit, question
            })

            if (questionResources) {
                return res.success(
                    'Lấy tất cả tài nguyên câu hỏi thành công!',
                    {
                        count: questionResources.count,
                        questionResources: questionResources.rows
                    }
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
            const data = await QuestionResourceServices.getOne(id)
            if (data) {
                const filePath = path.join(__dirname, '../' + data.question_resource_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const questionResource = await QuestionResourceServices.delete(id)

                    if (questionResource) {
                        return res.successNoData(
                            'Xóa tài nguyên câu hỏi thành công!'
                        )
                    }
                }
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