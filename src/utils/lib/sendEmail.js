const nodemailer = require("nodemailer")

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject,
            text
        })
    } catch (e) {
        console.log(e)
    }
}