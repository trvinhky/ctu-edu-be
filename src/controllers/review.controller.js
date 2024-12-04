const ReviewServices = require("../services/review.service")

const ReviewControllers = {
    async create(req, res) {
        const {
            review_ratings,
            review_content,
            document_Id
        } = req.body

        const { account_Id } = req

        if (!document_Id || !account_Id || isNaN(+review_ratings) || !review_content) {
            return res.errorValid()
        }

        try {
            const newReview = await ReviewServices.create({
                review_ratings,
                review_content,
                document_Id,
                account_Id
            })

            if (newReview) {
                return res.successNoData(
                    'Thêm mới đánh giá thành công!'
                )
            }

            return res.error(404, 'Thêm mới đánh giá thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id đánh giá không tồn tại!'
            )
        }

        try {
            const review = await ReviewServices.getOne(id)

            if (review) {
                return res.success(
                    'Lấy đánh giá thành công!',
                    review
                )
            }

            return res.error(404, 'Lấy đánh giá thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, ratings, document, account } = req.query

        try {
            const reviews = await ReviewServices.getAll({
                page, limit, ratings, document, account
            })

            if (reviews) {
                return res.success(
                    'Lấy tất cả đánh giá thành công!',
                    {
                        count: reviews.count,
                        reviews: reviews.rows
                    }
                )
            }

            return res.error(404, 'Lấy tất cả đánh giá thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = ReviewControllers