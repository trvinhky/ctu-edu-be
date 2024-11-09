const db = require("../models");
const BuyServices = require("../services/buy.service");
const DocumentServices = require("../services/document.service")
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const DocumentControllers = {
    async create(req, res) {
        const {
            document_title,
            document_content,
            store_Id,
            document_score,
            format_Id
        } = req.body

        if (!document_title || !store_Id || isNaN(+document_score) || !format_Id || !req.file) {
            return res.errorValid()
        }

        try {
            //const filePath = path.join('uploads', req.file.filename)
            const filePath = path.resolve(__dirname, '../uploads', req.file.filename)
            // Kiểm tra sự tồn tại của file
            if (!fs.existsSync(filePath)) {
                return res.error(
                    404,
                    'File không tồn tại!'
                )
            }

            const logoPath = path.join(__dirname, '../uploads/', 'logo_512.png');
            // Kiểm tra sự tồn tại của file
            if (!fs.existsSync(logoPath)) {
                return res.error(
                    404,
                    'Logo không tồn tại!'
                )
            }

            // Đọc file PDF gốc
            const existingPdfBytes = fs.readFileSync(filePath);
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Đọc file logo
            const logoBytes = fs.readFileSync(logoPath);
            const logoImage = await pdfDoc.embedPng(logoBytes);

            const logoWidth = logoImage.width;
            const logoHeight = logoImage.height;

            // Lấy tất cả các trang của PDF
            const pages = pdfDoc.getPages();
            for (const page of pages) {
                const { width, height } = page.getSize();

                // Tính vị trí và kích thước của logo
                const scaledLogoWidth = width / 4;  // Điều chỉnh kích thước logo cho phù hợp
                const scaledLogoHeight = (logoHeight / logoWidth) * scaledLogoWidth;

                // Thêm logo vào mỗi trang với độ mờ 0.2 (20% opacity)
                page.drawImage(logoImage, {
                    x: width - scaledLogoWidth - 50,  // Căn góc phải
                    y: height - scaledLogoHeight - 50, // Căn góc trên
                    width: scaledLogoWidth,
                    height: scaledLogoHeight,
                    opacity: 0.2 // Điều chỉnh độ mờ
                });
            }

            // Lưu PDF mới có logo
            const modifiedPdfBytes = await pdfDoc.save();
            const uploadFolder = path.join(__dirname, '../uploads');
            const modifiedFilePath = path.join(uploadFolder, `modified_${req.file.filename}`);
            const modifiedFileSave = path.join('uploads', `modified_${req.file.filename}`);
            fs.writeFileSync(modifiedFilePath, modifiedPdfBytes);
            fs.unlinkSync(filePath);

            const newDocument = await DocumentServices.create(
                {
                    document_title,
                    document_content: document_content ?? '',
                    store_Id,
                    document_score: +document_score,
                    format_Id,
                    document_url: modifiedFileSave
                }
            )

            if (newDocument) {
                return res.successNoData(
                    'Thêm mới tài liệu thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới tài liệu thất bại!'
            )
        } catch (err) {
            console.log(err)
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            document_title,
            document_content,
            store_Id,
            document_score
        } = req.body

        const { id } = req.params

        if (!document_title || !id || isNaN(+document_score) || !store_Id) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()
        try {

            const document = await DocumentServices.update(
                {
                    document_title,
                    document_content: document_content ?? '',
                    store_Id,
                    document_score: +document_score,
                },
                id,
                transaction
            )

            if (document) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật tài liệu thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật tài liệu thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id tài liệu không tồn tại!'
            )
        }

        try {
            const document = await DocumentServices.getOne(id)

            if (document) {
                return res.success(
                    'Lấy tài liệu thành công!',
                    document
                )
            }

            return res.error(
                404,
                'Lấy tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, score, format, store, title } = req.query

        try {
            const documents = await DocumentServices.getAll({
                page, limit, score, format, store, title
            })

            if (documents) {
                return res.success(
                    'Lấy tất cả tài liệu thành công!',
                    {
                        count: documents.count,
                        documents: documents.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id tài liệu không tồn tại!'
            )
        }

        try {
            const checkValid = await BuyServices.getAll({
                document: id
            })

            if (checkValid?.count > 0) {
                return res.errorValid(
                    'Bài học không thể xóa!'
                )
            }

            const data = await DocumentServices.getOne(id)

            if (data) {
                const filePath = path.join(__dirname, '../' + data.document_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const document = await DocumentServices.delete(id)

                    if (document) {
                        return res.successNoData(
                            'Xóa tài liệu thành công!'
                        )
                    }
                }
            }

            return res.error(
                404,
                'Xóa tài liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = DocumentControllers