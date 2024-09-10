const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ApiError = require("../utils/constants/api-error")
const AccountServices = require("../services/account.service")
const AuthServices = require("../services/auth.service")
const RoleServices = require("../services/role.service")
const { ROLES } = require("../utils/constants")

const AccountControllers = {
    async create(req, res, next) {
        const { password, email, role, name } = req.body

        if (!password || !email || !name) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const hashedPassword = await bcrypt.hash(password, +process.env.SALT)

            const role_Id = role ?? (await RoleServices.getOne({ role_name: ROLES.USER })).role_Id

            if (!role_Id) {
                return next(new ApiError(
                    400,
                    'Không tồn tại Id role!'
                ))
            }

            const newAccount = await AccountServices.create(
                {
                    account_email: email,
                    account_password: hashedPassword,
                    role_Id: role_Id,
                    name
                }
            )

            if (newAccount) {
                return res.status(200).json({
                    message: 'Thêm mới người dùng thành công!'
                })
            }

            return res.status(404).json({
                message: 'Thêm mới người dùng thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async login(req, res, next) {
        const { password, email } = req.body

        if (!password || !email) {
            return next(new ApiError(
                400,
                'Tất cả các trường dữ liệu rỗng!'
            ))
        }

        try {
            const account = await AccountServices.getOne({ account_email: email }, true)
            if (account && (await bcrypt.compare(password, account.account_password))) {
                const refreshToken = AuthServices.generateRefreshToken(account)
                const accessToken = AuthServices.generateAccessToken(account)

                account.account_token = refreshToken
                await account.save()

                return res.status(201).json({
                    data: {
                        token: accessToken
                    },
                    message: 'Đăng nhập thành công!'
                })
            }

            return res.status(404).json({
                message: 'Email hoặc mật khẩu không khớp!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async logout(req, res, next) {
        const { account_Id } = req

        if (!account_Id) {
            return next(new ApiError(
                400,
                'Id người dùng không tồn tại!'
            ))
        }

        try {
            const account = await AccountServices.logout(account_Id)

            if (account) {
                return res.status(200).json({
                    message: 'Đăng xuất thành công!'
                })
            }

            return res.status(404).json({
                message: 'refresh token không tồn tại!'
            })
        } catch (error) {
            return next(new ApiError(
                500,
                error
            ))
        }
    },
    async updateAccessToken(req, res, next) {
        const refreshToken = req.body.token

        if (!refreshToken) {
            return next(new ApiError(
                400,
                'Refresh token không tồn tại!'
            ))
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Chưa đăng nhập!'
                    })
                }

                const accessToken = AuthServices.generateAccessToken({
                    account_Id: data.account_Id,
                    role: {
                        role_name: data.role
                    }
                })

                return res.status(201).json({
                    data: {
                        token: accessToken
                    },
                    message: 'Cập nhật token thành công!'
                })
            }
        );
    },
    async getOne(req, res, next) {
        const { account_Id } = req

        if (!account_Id) {
            return next(new ApiError(
                400,
                'Id người dùng không tồn tại!'
            ))
        }

        try {
            const account = await AccountServices.getOne({ account_Id })

            if (account) {
                return res.status(201).json({
                    data: account,
                    message: 'Lấy thông tin tài khoản thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy thông tin tài khoản thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    },
    async getAll(req, res, next) {
        const { page, limit, role } = req.query

        try {
            const accounts = await AccountServices.getAll({
                page, limit, role
            })

            if (accounts) {
                return res.status(201).json({
                    data: accounts,
                    message: 'Lấy tất cả tài khoản thành công!'
                })
            }

            return res.status(404).json({
                message: 'Lấy tất cả tài khoản thất bại!'
            })
        } catch (err) {
            return next(new ApiError(
                500,
                err
            ))
        }
    }
}

module.exports = AccountControllers