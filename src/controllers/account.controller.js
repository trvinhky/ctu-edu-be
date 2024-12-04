const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const AccountServices = require("../services/account.service")
const AuthServices = require("../services/auth.service")
const sendEmail = require("../utils/lib/sendEmail")
const { createVerificationCode, verifyCode, generateCaptcha, expirationTime } = require("../utils/constants/verify-code")
const fs = require('fs');
const db = require("../models");

const AccountControllers = {
    async getCaptCha(req, res) {
        const captcha = generateCaptcha(req, res)
        return res.success('OK!', {
            url: captcha.captchaUrl
        })
    },
    async sendEmailCode(req, res) {
        const { email, isForgot } = req.body
        if (!email) {
            return res.errorValid('Email không tồn tại!')
        }

        if (typeof isForgot === 'undefined') {
            const account = await AccountServices.getOne({ account_email: email })

            if (account) {
                return res.error(404, 'Email đã tồn tại!')
            }
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
        const { password, email, isAdmin, name, code } = req.body

        if (!password || !email || !name || !code) {
            return res.errorValid()
        }

        const checkCode = verifyCode(req, code)
        if (!checkCode.valid) {
            return res.error(403, checkCode.message)
        }

        try {
            const hashedPassword = await bcrypt.hash(password, +process.env.SALT)

            const data = {
                account_email: email,
                account_password: hashedPassword,
                account_name: name,
                account_score: 50
            }

            if (typeof isAdmin !== 'undefined') {
                data.account_admin = JSON.parse(isAdmin)
            }

            const newAccount = await AccountServices.create(data)

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
                if (account.account_band) {
                    return res.error(400, 'Tài khoản đã bị khóa!')
                }

                const refreshToken = AuthServices.generateRefreshToken(account)
                const accessToken = AuthServices.generateAccessToken(account)

                account.account_token = refreshToken
                await account.save()

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // Thời hạn cookie (7 ngày)
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
                res.clearCookie('refreshToken')
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
            return res.error(404, 'Refresh token chưa được cấp!')
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, data) => {
                if (err || !data) {
                    return res.error(404, 'Refresh token không tồn tại!')
                }
                try {
                    const accessToken = AuthServices.generateAccessToken(data)
                    const refreshToken = AuthServices.generateRefreshToken(data)

                    const account = await AccountServices.getOne({ account_Id: data?.account_Id })
                    account.account_token = refreshToken
                    await account.save()
                    if (account) {
                        return res.success(
                            'Cập nhật token thành công!',
                            {
                                token: accessToken
                            }
                        )
                    }

                    return res.error(404, 'Cập nhật token thất bại!')
                } catch (e) {
                    return res.errorServer()
                }
            }
        );
    },
    async getOne(req, res) {
        const { account_Id } = req

        if (!account_Id) {
            return res.errorValid('Id tài khoản không tồn tại!')
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
        const { page, limit, role, active } = req.query

        try {
            const accounts = await AccountServices.getAll({
                page, limit, role, active
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
    /* Chức năng của đổi mật khẩu và quên mật khẩu */
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

        const transaction = await db.sequelize.transaction()

        try {
            const hashedPassword = await bcrypt.hash(password, +process.env.SALT)

            const account = await AccountServices.update(
                { account_password: hashedPassword },
                { account_Id, account_email: email },
                transaction
            )

            if (account) {
                await transaction.commit()
                return res.successNoData('Thay đổi mật khẩu thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Thay đổi mật khẩu thất bại!')
        } catch (err) {
            await transaction.rollback()
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
    },
    async update(req, res) {
        const { account_admin, account_Id, account_band } = req.body

        if (!account_Id) {
            return res.errorValid(
                'Không tồn tại account_Id!'
            )
        }

        const transaction = await db.sequelize.transaction()

        try {
            const data = {}
            if (typeof account_admin !== 'undefined') {
                data.account_admin = JSON.parse(account_admin)
            }

            if (typeof account_band !== 'undefined') {
                data.account_band = JSON.parse(account_band)
            }

            const account = await AccountServices.update(
                data,
                { account_Id },
                transaction
            )

            if (account) {
                await transaction.commit()
                return res.successNoData('Thay đổi thông tin thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Thay đổi thông tin thất bại!')
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async changeScore(req, res) {
        const { account_Id, account_email, account_score } = req.body

        if ((!account_email && !account_Id) || isNaN(+account_score)) {
            return res.errorValid()
        }

        try {
            const account = await AccountServices.updateScore(
                account_score,
                {
                    account_Id,
                    account_email
                }
            )

            if (account) {
                return res.successNoData('Cập nhật điểm tích lũy thành công!')
            }

            return res.error(404, 'Cập nhật điểm tích lũy thất bại!')
        } catch (err) {
            return res.errorServer()
        }
    },
    async changeName(req, res) {
        const { account_name } = req.body
        const { account_Id } = req

        if (!account_Id || !account_name) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const account = await AccountServices.update(
                { account_name },
                { account_Id },
                transaction
            )

            if (account) {
                await transaction.commit()
                return res.successNoData('Thay đổi tên tài khoản thành công!')
            }

            await transaction.rollback()
            return res.error(404, 'Thay đổi tên tài khoản thất bại!')
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    }
}

module.exports = AccountControllers