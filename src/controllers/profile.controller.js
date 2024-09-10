const ProfileServices = require("../services/profile.service")
const ApiError = require("../utils/constants/api-error")

const ProfileControllers = {
    async getOne(req, res, next) {
        const { id } = req.params

        if (!id) {
            return next(new ApiError(
                400,
                'Id không tồn tại!'
            ))
        }

        try {
            const profile = await ProfileServices.getOne(id)

            if (profile) {
                return res.status(201).json({
                    data: profile,
                    message: 'Lấy thông tin người dùng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy thông tin người dùng thất bại!'
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
            profile_name,
            profile_address,
            profile_phone,
            profile_avatar,
            profile_birthday,
            profile_info,
        } = req.body

        const { id } = req.params

        if (!profile_name || !id) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng'
            ))
        }

        try {
            const profile = ProfileServices.update({
                profile_name,
                profile_address: profile_address ?? null,
                profile_phone: profile_phone ?? null,
                profile_avatar: profile_avatar ?? null,
                profile_birthday: profile_birthday ?? null,
                profile_info: profile_info ?? null
            }, id)

            if (profile) {
                return res.status(200).json({
                    message: 'Cập nhật thông tin người dùng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Cập nhật thông tin người dùng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = ProfileControllers