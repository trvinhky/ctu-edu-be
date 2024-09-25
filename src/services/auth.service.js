const jwt = require('jsonwebtoken')

const AuthServices = {
    generateAccessToken(payload) {
        const { account_Id, role } = payload

        return jwt.sign(
            { account_Id, role: role?.role_name },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )
    },
    generateRefreshToken(payload) {
        const { account_Id, role } = payload

        return jwt.sign(
            { account_Id, role: role?.role_name },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        )
    }
}

module.exports = AuthServices