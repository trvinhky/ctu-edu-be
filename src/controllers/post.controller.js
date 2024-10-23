const db = require("../models")
const PostServices = require("../services/post.service")
const ProfileServices = require("../services/profile.service")
const StatusServices = require("../services/status.service")
const { STATUS } = require("../utils/constants")

const PostControllers = {
    async create(req, res) {
        const {
            post_title,
            post_content,
            subject_Id,
            auth_Id
        } = req.body

        if (!post_title || !post_content || !subject_Id || !auth_Id) {
            return res.errorValid()
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_name: STATUS.PENDING })).status_Id

            if (!status_Id) {
                return res.error(
                    404,
                    'Thêm mới bài đăng thất bại!'
                )
            }

            const newPost = await PostServices.create(
                {
                    post_title,
                    post_content,
                    status_Id,
                    subject_Id,
                    auth_Id
                }
            )

            if (newPost) {
                return res.successNoData(
                    'Thêm mới bài đăng thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { id } = req.params

        const {
            post_title,
            post_content,
            subject_Id,
            status_Id
        } = req.body

        if (!id || !post_title || !post_content || !subject_Id || !status_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const pendingId = (await StatusServices.getOne({ status_name: STATUS.PENDING })).status_Id
            const confirmId = (await StatusServices.getOne({ status_name: STATUS.CONFIRM })).status_Id

            if (!pendingId || confirmId !== status_Id) {
                return res.error(
                    404,
                    'Cập nhật trạng thái thất bại!'
                )
            }

            const post = await PostServices.update(
                {
                    post_title,
                    post_content,
                    subject_Id,
                    status_Id
                },
                id,
                transaction
            )

            if (post) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật bài đăng thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật bài đăng thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, status, auth, title, subject, isview } = req.query

        try {
            let statusId = status
            if (JSON.parse(isview)) {
                statusId = (await StatusServices.getOne({ status_name: STATUS.CONFIRM })).status_Id

                if (!statusId) {
                    return res.error(
                        404,
                        'Cập nhật trạng thái thất bại!'
                    )
                }
            }
            const posts = await PostServices.getAll({
                page, limit, status: statusId, auth, title, subject
            })

            if (posts) {
                return res.success(
                    'Lấy tất cả bài đăng thành công!',
                    {
                        count: posts.count,
                        posts: posts.rows
                    }
                )
            }

            return rres.error(
                404,
                'Lấy tất cả bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài đăng không tồn tại!'
            )
        }

        try {
            const post = await PostServices.getOne(id)

            if (post) {
                return res.success(
                    'Lấy bài đăng thành công!',
                    post
                )
            }

            return res.error(
                404,
                'Lấy bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài thi và Id câu hỏi không tồn tại!'
            )
        }

        try {
            const info = await PostServices.getOne(id)

            if (!info || (info && info?.status?.status_name?.includes(STATUS.CONFIRM))) {
                return res.error(
                    404,
                    'Trạng thái bài đăng không hợp lệ!'
                )
            }

            const post = await PostServices.delete(id)

            if (post) {
                return res.successNoData(
                    'Xóa bài đăng thành công!'
                )
            }

            return res.error(
                404,
                'Xóa bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async updateStatus(req, res) {
        const { id } = req.params
        const { status_Id } = req.body
        const { account_Id } = req

        if (!id || !status_Id) {
            return res.errorValid()
        }

        if (!account_Id) {
            return res.errorValid('Id người dùng không tồn tại!')
        }

        const transaction = await db.sequelize.transaction()

        try {
            const confirmId = (await StatusServices.getOne({ status_name: STATUS.CONFIRM })).status_Id

            if (!confirmId) {
                return res.error(
                    404,
                    'Không kiểm tra được trạng thái!'
                )
            }

            const post = await PostServices.update(
                { status_Id },
                id,
                transaction
            )

            if (confirmId === status_Id) {
                const profile = await ProfileServices.getOne(account_Id, false)
                if (!profile) {
                    await transaction.rollback()
                    return res.error(404, 'Không tồn tại tài khoản!')
                }

                const isUpdate = await ProfileServices.update(
                    {
                        profile_score: profile.profile_score + 50
                    },
                    account_Id,
                    false
                )

                if (isUpdate) {
                    await transaction.commit()
                    return res.successNoData(
                        'Cập nhật trạng thái bài đăng thành công!'
                    )
                }

                await transaction.rollback()
                return res.error(
                    404,
                    'Cập nhật trạng thái bài đăng thất bại!'
                )
            }

            if (post) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật trạng thái bài đăng thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật trạng thái bài đăng thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    }
}

module.exports = PostControllers