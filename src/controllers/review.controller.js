const ReviewServices = require("../services/review.service")
const ApiError = require("../utils/constants/api-error")

const ReviewControllers = {
    async create(req, res, next) {
        const {
            review_rating,
            review_comment,
            student_Id,
            course_Id
        } = req.body

        if (isNaN(+review_rating) || !course_Id || !review_comment || !student_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Thêm mới review thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới review thất bại!'
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
            review_rating,
            review_comment,
            student_Id,
            course_Id
        } = req.body

        const { id } = req.params

        if (isNaN(+review_rating) || !course_Id || !review_comment || !student_Id || !id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
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
                return res.status(200).json({
                    message: 'Cập nhật review thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật review thất bại!'
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
                'Id review không tồn tại!'
            ))
        }

        try {
            const review = await ReviewServices.getOne(id)

            if (review) {
                return res.status(201).json({
                    data: review,
                    message: 'Lấy review thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy review thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, student, course } = req.query

        try {
            const reviews = await ReviewServices.getAll({
                page, limit, student, course
            })

            if (reviews) {
                return res.status(201).json({
                    data: reviews,
                    message: 'Lấy tất cả review thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả review thất bại!'
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
                'Id review không tồn tại!'
            ))
        }

        try {
            const review = await ReviewServices.delete(id)

            if (review) {
                return res.status(200).json({
                    message: 'Xóa review thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa review thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
}

module.exports = ReviewControllers