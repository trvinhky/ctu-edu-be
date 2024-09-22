const PostServices = require("../services/post.service")
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
            subject_Id
        } = req.body

        if (!id || !post_title || !post_content || !subject_Id) {
            return res.errorValid()
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_name: STATUS.PENDING })).status_Id

            if (!status_Id) {
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
                id
            )

            if (post) {
                return res.successNoData(
                    'Cập nhật bài đăng thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật trạng thái thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, status, auth } = req.query

        if (!auth) {
            return res.errorValid(
                'Id người dùng không tồn tại!'
            )
        }

        try {
            const posts = await PostServices.getAll({
                page, limit, status, auth
            })

            if (posts) {
                return res.success(
                    'Lấy tất cả bài đăng thành công!',
                    posts
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
        const { status, id } = req.query

        if (!(status || id)) {
            return res.errorValid(
                'Id bài thi và Id câu hỏi không tồn tại!'
            )
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_name: STATUS.PENDING })).status_Id

            if (status_Id !== status) {
                return res.error(
                    404,
                    'Trạng thái bài đăng không hợp lệ!'
                )
            }

            const post = await PostServices.delete({
                status, id
            })

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

        if (!id || !status_Id) {
            return res.errorValid()
        }

        try {
            const post = await PostServices.update(
                { status_Id },
                id
            )

            if (post) {
                return res.successNoData(
                    'Cập nhật trạng thái bài đăng thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật trạng thái bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = PostControllers