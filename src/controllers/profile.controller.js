const db = require("../models")
const ProfileServices = require("../services/profile.service")
const path = require('path');

const ProfileControllers = {
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id không tồn tại!'
            )
        }

        try {
            const profile = await ProfileServices.getOne(id)

            if (profile) {
                return res.success(
                    'Lấy thông tin người dùng thành công!',
                    profile
                )
            }

            return res.error(
                404,
                'Lấy thông tin người dùng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            profile_name,
            profile_address,
            profile_phone,
            profile_birthday,
            profile_info
        } = req.body

        const { id } = req.params

        if (!profile_name || !id) {
            return res.errorValid()
        }

        let filePath
        if (req.file) {
            filePath = path.join('uploads', req.file.filename)
        }

        const transaction = await db.sequelize.transaction()

        const data = {
            profile_name,
            profile_address: profile_address ?? null,
            profile_phone: profile_phone ?? null,
            profile_birthday: profile_birthday ?? null,
            profile_info: profile_info ?? null
        }

        if (filePath) {
            data.profile_avatar = filePath
        }

        try {
            const profile = await ProfileServices.update(data, id, transaction)

            if (profile) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật thông tin người dùng thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật thông tin người dùng thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async recharge(req, res) {
        const { profile_score } = req.body
        const { id } = req.params

        if (isNaN(+profile_score) || !id) {
            return res.errorValid()
        }

        try {
            const profile = await ProfileServices.recharge(
                +profile_score,
                id,
            )

            if (profile) {
                return res.successNoData(
                    'Thêm điểm người dùng thành công!'
                )
            }

            return res.error(
                404,
                'Thêm điểm người dùng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = ProfileControllers