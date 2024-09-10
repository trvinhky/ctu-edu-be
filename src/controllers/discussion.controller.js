const DiscussionServices = require("../services/discussion.service")
const ApiError = require("../utils/constants/api-error")

const DiscussionControllers = {
    async create(req, res, next) {
        const {
            discussion_comment,
            lesson_Id,
            account_Id,
            parent_Id
        } = req.body

        if (!discussion_comment || !lesson_Id || !account_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const newDiscussion = await DiscussionServices.create(
                {
                    discussion_comment,
                    lesson_Id,
                    account_Id,
                    parent_Id: parent_Id ?? null
                }
            )

            if (newDiscussion) {
                return res.status(200).json({
                    message: 'Thêm mới thảo luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới thảo luận thất bại!'
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
            discussion_comment,
            lesson_Id,
            account_Id,
            parent_Id
        } = req.body
        const { id } = req.params

        if (!discussion_comment || !lesson_Id || !account_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường không được rỗng!'
            ))
        }

        try {
            const discussion = await DiscussionServices.update(
                {
                    discussion_comment,
                    lesson_Id,
                    account_Id,
                    parent_Id: parent_Id ?? null
                },
                id
            )

            if (discussion) {
                return res.status(200).json({
                    message: 'Cập nhật thảo luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật thảo luận thất bại!'
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
                'Id thảo luận không tồn tại!'
            ))
        }

        try {
            const discussion = await DiscussionServices.getOne(id)

            if (discussion) {
                return res.status(201).json({
                    data: discussion,
                    message: 'Lấy thảo luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy thảo luận thất bại!'
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
            const discussions = await DiscussionServices.getAll({
                page, limit, id
            })

            if (discussions) {
                return res.status(201).json({
                    data: discussions,
                    message: 'Lấy tất cả thảo luận thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả thảo luận thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = DiscussionControllers