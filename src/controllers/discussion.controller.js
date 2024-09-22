const DiscussionServices = require("../services/discussion.service")

const DiscussionControllers = {
    async create(req, res) {
        const {
            discussion_comment,
            lesson_Id,
            account_Id,
            parent_Id
        } = req.body

        if (!discussion_comment || !lesson_Id || !account_Id) {
            return res.errorValid()
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
                return res.successNoData(
                    'Thêm mới thảo luận thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới thảo luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            discussion_comment,
            lesson_Id,
            account_Id,
            parent_Id
        } = req.body
        const { id } = req.params

        if (!discussion_comment || !lesson_Id || !account_Id) {
            return res.errorValid()
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
                return res.successNoData(
                    'Cập nhật thảo luận thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật thảo luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id thảo luận không tồn tại!'
            )
        }

        try {
            const discussion = await DiscussionServices.getOne(id)

            if (discussion) {
                return res.success(
                    'Lấy thảo luận thành công!',
                    discussion
                )
            }

            return res.error(
                404,
                'Lấy thảo luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, id } = req.query

        try {
            const discussions = await DiscussionServices.getAll({
                page, limit, id
            })

            if (discussions) {
                return res.success(
                    'Lấy tất cả thảo luận thành công!',
                    discussions
                )
            }

            return res.error(
                404,
                'Lấy tất cả thảo luận thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = DiscussionControllers