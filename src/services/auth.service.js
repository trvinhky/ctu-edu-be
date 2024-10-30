const jwt = require('jsonwebtoken')

const AuthServices = {
    generateAccessToken(payload) {
        const { account_Id, account_admin } = payload

        return jwt.sign(
            { account_Id, account_admin },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )
    },
    generateRefreshToken(payload) {
        const { account_Id, account_admin } = payload

        return jwt.sign(
            { account_Id, account_admin },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        )
    }
}

module.exports = AuthServices