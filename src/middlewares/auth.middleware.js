const jwt = require('jsonwebtoken')
const { ROLES } = require('../utils/constants')

const AuthMiddlewares = {
    verifyToken(req, res, next) {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({
            message: 'Token không tồn tại!'
        })

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Token không hợp lệ!'
                    })
                }

                req.account_Id = data.account_Id
                req.role = data.role
                next();
            }
        );
    },
    adminRole(req, res, next) {
        if (req.role !== ROLES.ADMIN) {
            return res.status(403).json({
                message: 'Không đủ quyền!'
            })
        }
        next()
    },
    teacherRole(req, res, next) {
        if (req.role !== ROLES.TEACHER) {
            return res.status(403).json({
                message: 'Không đủ quyền!'
            })
        }
        next()
    },
    otherUser(req, res, next) {
        if (!(req.role !== ROLES.ADMIN || req.role !== ROLES.TEACHER)) {
            return res.status(403).json({
                message: 'Không đủ quyền!'
            })
        }
        next()
    }
}

module.exports = AuthMiddlewares 