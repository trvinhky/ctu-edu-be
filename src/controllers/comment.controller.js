const CommentServices = require("../services/comment.service")
const ApiError = require("../utils/constants/api-error")

const CommentControllers = {
    async create(req, res, next) {
        const {
            comment_content,
            post_Id,
            account_Id,
            parent_Id
        } = req.body

        if (!comment_content || !post_Id || !account_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newComment = await CommentServices.create(
                {
                    comment_content,
                    post_Id,
                    account_Id,
                    parent_Id: parent_Id ?? null
                }
            )

            if (newComment) {
                return res.status(200).json({
                    message: 'Thêm mới bình luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới bình luận thất bại!'
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
            comment_content,
            post_Id,
            account_Id,
            parent_Id
        } = req.body
        const { id } = req.params

        if (!comment_content || !post_Id || !account_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const comment = await CommentServices.update(
                {
                    comment_content,
                    post_Id,
                    account_Id,
                    parent_Id: parent_Id ?? null
                },
                id
            )

            if (comment) {
                return res.status(200).json({
                    message: 'Cập nhật bình luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật bình luận thất bại!'
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
                'Id bình luận không tồn tại!'
            ))
        }

        try {
            const comment = await CommentServices.getOne(id)

            if (comment) {
                return res.status(201).json({
                    data: comment,
                    message: 'Lấy bình luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy bình luận thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, id } = req.query

        try {
            const comments = await CommentServices.getAll({
                page, limit, id
            })

            if (comments) {
                return res.status(201).json({
                    data: comments,
                    message: 'Lấy tất cả bình luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả bình luận thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = CommentControllers