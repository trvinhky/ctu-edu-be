const db = require("../models")
const QuestionServices = require("../services/question.service")
const path = require('path');
const fs = require('fs');

const QuestionControllers = {
    async create(req, res) {
        const {
            question_content,
            auth_Id,
            category_Id
        } = req.body

        if (!question_content || !auth_Id) {
            return res.errorValid()
        }

        try {
            let filePath
            if (req.file) {
                if (!category_Id) {
                    return res.errorValid()
                }
                filePath = path.join('uploads', req.file.filename)
            }

            const newQuestion = await QuestionServices.create(
                {
                    question_content,
                    auth_Id,
                    question_url: filePath ?? null,
                    category_Id: category_Id ?? null
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
            auth_Id,
            category_Id
        } = req.body

        const { id } = req.params

        if (!question_content || !id || !auth_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            let filePath
            if (req.file) {
                if (!category_Id) {
                    return res.errorValid()
                }
                filePath = path.join('uploads', req.file.filename)
            }
            const question = await QuestionServices.update(
                {
                    question_content,
                    auth_Id,
                    question_url: filePath ?? null,
                    category_Id: category_Id ?? null
                },
                id,
                transaction
            )

            if (question) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật câu hỏi thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật câu hỏi thất bại!'
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
        const { page, limit, id, title } = req.query

        try {
            const questions = await QuestionServices.getAll({
                page, limit, id, title
            })

            if (questions) {
                return res.success(
                    'Lấy tất cả câu hỏi thành công!',
                    {
                        count: questions.count,
                        questions: questions.rows
                    }
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
            const data = await QuestionServices.getOne(id)
            if (data) {
                const filePath = path.join(__dirname, '../' + data.question_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const question = await QuestionServices.delete(id)

                    if (question) {
                        return res.successNoData(
                            'Xóa câu hỏi thành công!'
                        )
                    }
                }

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