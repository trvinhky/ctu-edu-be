const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const AccountServices = require("../services/account.service")
const AuthServices = require("../services/auth.service")
const RoleServices = require("../services/role.service")
const { ROLES } = require("../utils/constants")
const sendEmail = require("../utils/lib/sendEmail")
const { createVerificationCode, verifyCode, generateCaptcha, expirationTime } = require("../utils/constants/verify-code")
const fs = require('fs');

const AccountControllers = {
    async getCaptCha(req, res) {
        const captcha = generateCaptcha(req, res)
        return res.success('OK!', {
            url: captcha.captchaUrl
        })
    },
    async sendEmailCode(req, res) {
        const { email } = req.body
        if (!email) {
            return res.errorValid('Email không tồn tại!')
        }

        const account = await AccountServices.getOne({ account_email: email })

        if (account) {
            return res.error(404, 'Email đã tồn tại!')
        }

        const code = createVerificationCode(req)

        await sendEmail(
            email,
            'Mã xác thực',
            `Vui lòng nhập mã này trong vòng 5 phút: <br></br> <b style="color: red; font-size: 50px">${code}</b>`
        )

        return res.successNoData('OK!')
    },
    async create(req, res) {
        const { password, email, role, name, code } = req.body

        if (!password || !email || !name || !code) {
            return res.errorValid()
        }

        const checkCode = verifyCode(req, code)
        if (!checkCode.valid) {
            return res.error(403, checkCode.message)
        }

        try {
            const hashedPassword = await bcrypt.hash(password, +process.env.SALT)

            const role_Id = role ?? (await RoleServices.getOne({ role_name: ROLES.USER })).role_Id

            if (!role_Id) {
                return res.error(404, 'Thêm mới người dùng thất bại!')
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
                return res.successNoData('Thêm mới người dùng thành công!')
            }

            return res.error(404, 'Thêm mới người dùng thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async login(req, res) {
        const { password, email, captcha } = req.body
        const captchaSession = req.session.captcha;

        if (!password || !email || !captcha) {
            return res.errorValid()
        }

        try {
            const { text, createdAt, filePath } = captchaSession;

            if (!captchaSession) {
                return res.error(500, 'Lỗi server, vui lòng thử lại!')
            }

            // Kiểm tra nếu CAPTCHA đã hết hạn
            if (Date.now() - createdAt > expirationTime) {
                return res.error(400, 'CAPTCHA đã hết hạn, vui lòng thử lại!')
            }

            // Kiểm tra nếu CAPTCHA không khớp
            if (captcha.toLowerCase() !== text.toLowerCase()) {
                return res.error(400, 'CAPTCHA không đúng!')
            }
            const account = await AccountServices.getOne({ account_email: email }, true)
            if (account && (await bcrypt.compare(password, account.account_password))) {
                const refreshToken = AuthServices.generateRefreshToken(account)
                const accessToken = AuthServices.generateAccessToken(account)

                account.account_token = refreshToken
                await account.save()

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Lax',
                    maxAge: 24 * 60 * 60 * 1000 // Thời hạn cookie (1 ngày)
                });

                // Xóa file ảnh CAPTCHA sau khi đã sử dụng
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

                return res.success(
                    'Đăng nhập thành công!',
                    { token: accessToken }
                )
            }

            return res.error(404, 'Email hoặc mật khẩu không khớp!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async logout(req, res) {
        const { account_Id } = req

        if (!account_Id) {
            return res.errorValid('Id người dùng không tồn tại!')
        }

        try {
            const account = await AccountServices.logout(account_Id)

            if (account) {
                return res.successNoData('Đăng xuất thành công!')
            }

            return res.error(404, 'refresh token không tồn tại!')
        } catch (error) {
            return res.errorServer()
        }
    },
    async updateAccessToken(req, res) {
        const refreshToken = req?.cookies?.refreshToken

        if (!refreshToken) {
            return res.error(403, 'Refresh token chưa được cấp!')
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    return res.error(403, 'Refresh token không tồn tại!')
                }

                const accessToken = AuthServices.generateAccessToken({
                    account_Id: data.account_Id,
                    role: {
                        role_name: data.role
                    }
                })

                return res.success(
                    'Cập nhật token thành công!',
                    {
                        token: accessToken
                    }
                )
            }
        );
    },
    async getOne(req, res) {
        const { account_Id } = req

        if (!account_Id) {
            return res.errorValid('Id người dùng không tồn tại!')
        }

        try {
            const account = await AccountServices.getOne({ account_Id })

            if (account) {
                return res.success(
                    'Lấy thông tin tài khoản thành công!',
                    account
                )
            }

            return res.error(404, 'Lấy thông tin tài khoản thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, role } = req.query

        try {
            const accounts = await AccountServices.getAll({
                page, limit, role
            })

            if (accounts) {
                return res.success(
                    'Lấy tất cả tài khoản thành công!',
                    {
                        count: accounts.count,
                        accounts: accounts.rows
                    }
                )
            }

            return res.error(404, 'Lấy tất cả tài khoản thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async changePassword(req, res) {
        const { password, code, email } = req.body
        const { account_Id } = req

        if ((!email && !account_Id) || !password || !code) {
            return res.errorValid()
        }

        const checkCode = verifyCode(req, code)
        if (!checkCode.valid) {
            return res.error(403, checkCode.message)
        }

        try {
            const account = await AccountServices.update(
                password,
                { account_Id, account_email: email }
            )

            if (account) {
                return res.successNoData('Thay đổi mật khẩu thành công!')
            }

            return res.error(404, 'Thay đổi mật khẩu thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOneByEmail(req, res) {
        const { email } = req.body
        if (!email) {
            return res.errorValid('Email không tồn tại!')
        }

        try {
            const account = await AccountServices.getOne({ account_email: email })
            if (account) {
                return res.success('Lấy thông tin tài khoản thành công!', account)
            }

            return res.error(404, 'Lấy thông tin tài khoản thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = AccountControllers