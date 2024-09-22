const crypto = require('crypto')
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

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

const expirationTime = 2 * 60 * 1000; // 2 phút
const generateCaptcha = (req, res) => {
    try {
        const captchaText = crypto.randomBytes(+process.env.CODE_TOTAL).toString('hex');
        const canvas = createCanvas(200, 80);
        const ctx = canvas.getContext('2d');

        // Vẽ background với màu ngẫu nhiên
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Thêm nhiễu (noise)
        for (let i = 0; i < 150; i++) {
            ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
        }

        // Xoay và vẽ từng ký tự ngẫu nhiên
        ctx.font = '40px Arial';
        for (let i = 0; i < captchaText.length; i++) {
            // Xoay ký tự ngẫu nhiên
            const angle = Math.random() * 0.3 - 0.15; // Xoay từ -15 độ đến +15 độ
            ctx.save();
            ctx.translate(30 * (i + 1), 50); // Vị trí chữ
            ctx.rotate(angle);

            // Đổi màu chữ ngẫu nhiên
            ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            ctx.fillText(captchaText[i], 0, 0);
            ctx.restore();
        }

        // Thêm các đường ngẫu nhiên để gây rối
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        const fileName = `${crypto.randomBytes(+process.env.CODE_TOTAL).toString('hex')}.png`;
        const captchasDir = path.join(__dirname, '../../captchas');
        const filePath = path.join(captchasDir, fileName);

        // Lưu ảnh vào thư mục "captchas"
        fs.writeFileSync(filePath, canvas.toBuffer('image/png'));

        // Lưu vào session
        req.session.captcha = {
            text: captchaText,
            createdAt: Date.now(),
            filePath,
        };

        // Đặt thời gian để xóa file sau khi hết hạn
        setTimeout(() => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Xóa file
            }
        }, expirationTime);

        return {
            captchaText,
            captchaUrl: `/captchas/${fileName}`
        };
    } catch (e) {
        return res.error(500, 'Đã xảy ra lỗi trong quá trình tạo CAPTCHA.')
    }
};

module.exports = {
    createVerificationCode,
    verifyCode,
    generateCaptcha,
    expirationTime
}