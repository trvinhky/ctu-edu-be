const db = require("../models")
const OptionServices = require("../services/option.service")
const { TYPE } = require("../utils/constants")

const OptionControllers = {
    async checkQuestion(question) {
        try {
            const options = await OptionServices.findByCorrect({
                question, correct: true
            })
            if (options && options.count > 0) {
                const check = options.rows.find(
                    (option) => {
                        return option.option_is_correct === true
                            && option.question.type.type_name.includes(TYPE.ONE)
                    }
                )
                if (check) {
                    return false
                }
                return true
            }
            return false
        } catch (err) {
            return false
        }
    },
    async create(req, res) {
        const {
            option_content,
            option_is_correct,
            question_Id
        } = req.body

        if (!option_content || !question_Id) {
            return res.errorValid()
        }

        try {
            if (!!option_is_correct) {
                const check = await OptionControllers.checkQuestion(question_Id)
                if (!check) {
                    return res.errorValid(
                        'Lựa chọn không hợp lệ!'
                    )
                }
            }

            const newOption = await OptionServices.create(
                {
                    option_content,
                    option_is_correct: !!option_is_correct,
                    question_Id
                }
            )

            if (newOption) {
                return res.successNoData(
                    'Thêm mới lựa chọn thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            option_content,
            option_is_correct,
            question_Id
        } = req.body

        const { id } = req.params

        if (!option_content || !id || !question_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            if (!!option_is_correct) {
                const check = await OptionControllers.checkQuestion(question_Id)
                if (!check) {
                    return res.errorValid(
                        'Lựa chọn không hợp lệ!'
                    )
                }
            }

            const option = await OptionServices.update(
                {
                    option_content,
                    option_is_correct: !!(option_is_correct),
                    question_Id
                },
                id,
                transaction
            )

            if (option) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật lựa chọn thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật lựa chọn thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOptionByQuestionId(req, res) {
        const { question, correct } = req.query

        if (!id) {
            return res.errorValid(
                'Id câu hỏi không tồn tại!'
            )
        }

        try {
            const options = await OptionServices.findByCorrect({
                question, correct
            })

            if (options) {
                return res.success(
                    'Lấy tất cả lựa chọn thành công!',
                    {
                        count: options.count,
                        options: options.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả lựa chọn thất bại!'
            )

        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id lựa chọn không tồn tại!'
            )
        }

        try {
            const option = await OptionServices.getOne(id)

            if (option) {
                return res.success(
                    'Lấy lựa chọn thành công!',
                    option
                )
            }

            return res.error(
                404,
                'Lấy lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, id } = req.query

        try {
            const options = await OptionServices.getAll({
                page, limit, id
            })

            if (options) {
                return res.success(
                    'Lấy tất cả lựa chọn thành công!',
                    {
                        count: options.count,
                        options: options.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id lựa chọn không tồn tại!'
            )
        }

        try {
            const option = await OptionServices.delete(id)

            if (option) {
                return res.successNoData(
                    'Xóa lựa chọn thành công!'
                )
            }

            return res.error(
                404,
                'Xóa lựa chọn thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = OptionControllers