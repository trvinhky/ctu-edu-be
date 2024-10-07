const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

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
    },
    async readFilePDF(req, res) {
        const { fileName } = req.body

        if (!fileName) {
            return res.status(400).send("Tên file không tồn tại!")
        }

        const filePath = path.join(__dirname, '../', fileName);
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Không tồn tại file!')
        }

        try {
            // Đọc file PDF
            const existingPdfBytes = fs.readFileSync(filePath);

            // Tạo một PDFDocument từ file PDF đã đọc
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Tạo một PDFDocument mới
            const newPdfDoc = await PDFDocument.create();

            // Thêm trang từ file PDF cũ vào PDF mới
            const pagesToExtract = [0, 1, 2, 3];
            for (const pageIndex of pagesToExtract) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
                newPdfDoc.addPage(copiedPage);
            }

            // Lưu PDF mới thành byte array
            const pdfBytes = await newPdfDoc.save();

            // Đặt tiêu đề và kiểu nội dung cho phản hồi
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="extracted.pdf"');

            return res.send(pdfBytes);
        } catch (err) {
            return res.status(500).send('Error extracting PDF');
        }
    }
}

module.exports = FileControllers