const db = require("../models")
const PostServices = require("../services/post.service")
const ProfileServices = require("../services/profile.service")
const StatusServices = require("../services/status.service")
const path = require('path');
const fs = require('fs');

const PostControllers = {
    async create(req, res) {
        const {
            post_title,
            post_content,
            format_Id,
            account_Id
        } = req.body

        if (!post_title || !post_content || !format_Id || !account_Id || !req.file) {
            return res.errorValid()
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_index: 0 })).status_Id

            let filePath
            filePath = path.join('uploads', req.file.filename)

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
                    format_Id,
                    account_Id,
                    post_url: filePath
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
            status_Id
        } = req.body

        if (!id || !post_title || !post_content || !status_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const pendingId = (await StatusServices.getOne({ status_index: 0 })).status_Id
            const confirmId = (await StatusServices.getOne({ status_index: 1 })).status_Id

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
        const { page, limit, status, account, title, format, index } = req.query

        try {
            const posts = await PostServices.getAll({
                page, limit, status, account, title, format, index
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

            if (!info || (info && info?.status?.status_index === 1)) {
                return res.error(
                    404,
                    'Trạng thái bài đăng không hợp lệ!'
                )
            }

            const post = await PostServices.getOne(id)
            if (post) {
                const filePath = path.join(__dirname, '../' + data.post_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const check = await PostServices.delete(id)

                    if (check) {
                        return res.successNoData(
                            'Xóa bài đăng thành công!'
                        )
                    }
                }
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
        const { status_index, score } = req.body
        const { account_Id } = req

        if (!id || ![0, 1, -1].includes(+status_index)) {
            return res.errorValid()
        }

        if (!(status_index && +status_index === 1)) {
            return res.errorValid()
        }

        if (!account_Id) {
            return res.errorValid('Id người dùng không tồn tại!')
        }

        const transaction = await db.sequelize.transaction()

        try {
            const confirmId = (await StatusServices.getOne({ status_index: 0 })).status_Id
            const status_Id = (await StatusServices.getOne({ status_index: +status_index })).status_Id

            if (!confirmId) {
                return res.error(
                    404,
                    'Không kiểm tra được trạng thái!'
                )
            }

            if (!status_Id) {
                return res.error(
                    404,
                    'Lấy Id trạng thái bài đăng thất bại!'
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
                        profile_score: profile.profile_score + parseInt(score)
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