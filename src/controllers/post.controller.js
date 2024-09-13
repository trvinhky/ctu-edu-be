const PostServices = require("../services/post.service")
const StatusServices = require("../services/status.service")
const { STATUS } = require("../utils/constants")
const ApiError = require("../utils/constants/api-error")

const PostControllers = {
    async create(req, res, next) {
        const {
            post_title,
            post_content,
            status_Id,
            subject_Id,
            auth_Id
        } = req.body

        if (!post_title || !post_content || !status_Id || !subject_Id || !auth_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
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
                return res.status(200).json({
                    message: 'Thêm mới bài đăng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới bài đăng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async update(req, res, next) {
        const { id } = req.params

        const {
            post_title,
            post_content,
            subject_Id
        } = req.body

        if (!id || !post_title || !post_content || !subject_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_name: STATUS.PENDING })).status_Id

            if (!status_Id) {
                return next(new ApiError(
                    404,
                    'Cập nhật trạng thái thất bại!'
                ))
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
                return res.status(200).json({
                    message: 'Cập nhật bài đăng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật bài đăng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, status, auth } = req.query

        if (!auth) {
            return next(new ApiError(
                400,
                'Id người dùng không tồn tại!'
            ))
        }

        try {
            const posts = await PostServices.getAll({
                page, limit, status, auth
            })

            if (posts) {
                return res.status(201).json({
                    data: posts,
                    message: 'Lấy tất cả bài đăng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả bài đăng thất bại!'
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
                'Id bài đăng không tồn tại!'
            ))
        }

        try {
            const post = await PostServices.getOne(id)

            if (post) {
                return res.status(201).json({
                    data: post,
                    message: 'Lấy bài đăng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy bài đăng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async delete(req, res, next) {
        const { status, post } = req.query

        if (!(status || post)) {
            return next(new ApiError(
                400,
                'Id bài thi và Id câu hỏi không tồn tại!'
            ))
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_name: STATUS.PENDING })).status_Id

            if (status_Id !== status) {
                return next(new ApiError(
                    404,
                    'Trạng thái bài đăng không hợp lệ!'
                ))
            }

            const post = await PostServices.delete({
                status, post
            })

            if (post) {
                return res.status(200).json({
                    message: 'Xóa bài đăng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Xóa bài đăng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async updateStatus(req, res, next) {
        const { id } = req.params

        const { status_Id } = req.body

        if (!id || !status_Id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const post = await PostServices.update(
                { status_Id },
                id
            )

            if (post) {
                return res.status(200).json({
                    message: 'Cập nhật trạng thái bài đăng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật trạng thái bài đăng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = PostControllers