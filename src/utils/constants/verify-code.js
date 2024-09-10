const crypto = require('crypto')

// Hàm tạo và lưu mã xác nhận vào session
function createVerificationCode(req) {
    const code = crypto.randomBytes(+process.env.CODE_TOTAL).toString('hex');
    req.session.verificationCode = code;

    return code;
}

// Hàm kiểm tra mã xác nhận từ session
function verifyCode(req, code) {
    const storedCode = req.session.verificationCode;

    if (!storedCode) {
        return {
            valid: false,
            message: 'Mã xác thực hết hạn hoặc không tồn tại!'
        };
    }

    if (storedCode !== code) {
        return {
            valid: false,
            message: 'Mã xác thực không khớp!'
        };
    }

    delete req.session.verificationCode;
    return { valid: true };
}

module.exports = {
    createVerificationCode,
    verifyCode
}