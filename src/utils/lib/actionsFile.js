const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup thư mục lưu file upload
const uploadFolder = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Thiết lập nơi lưu trữ file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname); // Lấy đuôi file
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExt); // Tạo tên file
    }
});

// Tạo một middleware với cấu hình lưu trữ trên
const upload = multer({ storage: storage });

// Đọc file 1 phần dữ liệu
const readFileLess = (path) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path, { start: 0, end: 500 });
        let result = '';

        stream.on('data', chunk => {
            result += chunk.toString();
        });

        stream.on('end', () => {
            resolve(result);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};


module.exports = {
    upload,
    readFileLess
}