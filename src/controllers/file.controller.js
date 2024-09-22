const fs = require('fs');
const path = require('path');

const FileControllers = {
    async download(req, res) {
        const { filename } = req.params

        if (!filename) {
            return res.errorValid(
                'Tên file không tồn tại!'
            )
        }

        const filePath = path.join(__dirname, '../uploads', req.params.filename);
        const stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Length': stat.size,
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${req.params.filename}`
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
}

module.exports = FileControllers