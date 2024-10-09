const BuyServices = require("../services/buy.service")
const db = require("../models")
const LessonServices = require("../services/lesson.service")
const ProfileServices = require("../services/profile.service")

const BuyControllers = {
    async create(req, res) {
        const {
            student_Id,
            lesson_Id
        } = req.body

        if (!lesson_Id || !student_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {

            const lesson = await LessonServices.getOne(lesson_Id)
            if (!lesson) {
                return res.error(404, 'Không tồn tại bài học!')
            }

            const profile = await ProfileServices.getOne(student_Id, false)
            if (!profile) {
                return res.error(404, 'Không tồn tại tài khoản!')
            }

            if (profile.profile_score < lesson.lesson_score) {
                return res.error(403, 'Mua thất bại! Số điểm không đủ!')
            }

            const updateInfo = await ProfileServices.update({
                profile_score: profile.profile_score - lesson.lesson_score
            }, profile.profile_Id, transaction)

            const newBuy = await BuyServices.create(
                {
                    student_Id,
                    lesson_Id,
                    buy_date: new Date()
                },
                transaction
            )

            if (newBuy && updateInfo) {
                await transaction.commit()
                return res.successNoData('Mua bài học thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Mua bài học thất bại!')
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { lesson, student } = req.query
        if (!lesson || !student) {
            return res.errorValid()
        }

        try {
            const buy = await BuyServices.getOne(student, lesson)

            if (buy) {
                return res.success(
                    'Đã mua bài học này!',
                    buy
                )
            }

            return res.error('Kiểm tra thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, lesson, student } = req.query

        if (!(lesson || student)) {
            return res.errorValid(
                'Id tài khoản hoặc bài học không tồn tại!'
            )
        }

        try {
            const buy = await BuyServices.getAll({
                page, limit, lesson, student
            })

            if (buy) {
                return res.success(
                    'Lấy tất cả bài học đã mua thành công!',
                    {
                        count: buy.count,
                        buy: buy.rows
                    }
                )
            }

            return res.error('Lấy tất cả bài học đã mua thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = BuyControllers