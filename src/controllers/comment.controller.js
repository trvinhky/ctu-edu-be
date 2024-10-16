const CommentServices = require("../services/comment.service")

const CommentControllers = {
    async create(req, res) {
        const {
            comment_content,
            post_Id,
            account_Id,
            parent_Id
        } = req.body

        if (!comment_content || !post_Id || !account_Id) {
            return res.errorValid()
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
                return res.successNoData(
                    'Thêm mới bình luận thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới bình luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { comment_content } = req.body
        const { id } = req.params

        if (!comment_content || !post_Id) {
            return res.errorValid()
        }

        try {
            const comment = await CommentServices.update(
                { comment_content },
                id
            )

            if (comment) {
                return res.successNoData(
                    'Cập nhật bình luận thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật bình luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid('Id bình luận không tồn tại!')
        }

        try {
            const comment = await CommentServices.getOne(id)

            if (comment) {
                return res.success(
                    'Lấy bình luận thành công!',
                    comment
                )
            }

            return res.error(
                404,
                'Lấy bình luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, id } = req.query

        try {
            const comments = await CommentServices.getAll({
                page, limit, id
            })

            if (comments) {
                return res.success(
                    'Lấy tất cả bình luận thành công!',
                    {
                        count: comments.count,
                        comments: comments.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả bình luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = CommentControllers