const ReviewServices = require("../services/review.service")

const ReviewControllers = {
    async create(req, res) {
        const {
            review_rating,
            review_comment,
            student_Id,
            course_Id
        } = req.body

        if (isNaN(+review_rating) || !course_Id || !review_comment || !student_Id) {
            return res.errorValid()
        }

        try {
            const newLesson = await ReviewServices.create(
                {
                    review_rating: parseFloat(review_rating),
                    review_comment,
                    student_Id,
                    course_Id
                }
            )

            if (newLesson) {
                return res.successNoData(
                    'Thêm mới review thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới review thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            review_rating,
            review_comment,
            student_Id,
            course_Id
        } = req.body

        const { id } = req.params

        if (isNaN(+review_rating) || !course_Id || !review_comment || !student_Id || !id) {
            return res.errorValid()
        }

        try {
            const review = await ReviewServices.update(
                {
                    review_rating: parseFloat(review_rating),
                    review_comment,
                    student_Id,
                    course_Id
                },
                id
            )

            if (review) {
                return res.successNoData(
                    'Cập nhật review thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật review thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid()
        }

        try {
            const review = await ReviewServices.getOne(id)

            if (review) {
                return res.success(
                    'Lấy review thành công!',
                    review
                )
            }

            return res.error(
                404,
                'Lấy review thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, student, course } = req.query

        try {
            const reviews = await ReviewServices.getAll({
                page, limit, student, course
            })

            if (reviews) {
                return res.success(
                    'Lấy tất cả review thành công!',
                    reviews
                )
            }

            return res.error(
                404,
                'Lấy tất cả review thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid()
        }

        try {
            const review = await ReviewServices.delete(id)

            if (review) {
                return res.successNoData(
                    'Xóa review thành công!'
                )
            }

            return res.error(
                404,
                'Xóa review thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = ReviewControllers