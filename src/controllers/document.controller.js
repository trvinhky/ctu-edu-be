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
            format_Id,
            document_author,
            document_year,
        } = req.body

        if (!document_title || !store_Id
            || isNaN(+document_score)
            || !format_Id || !req.file
            || !document_author || isNaN(+document_year)
        ) {
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

            // Lấy dung lượng file gốc
            const fileStats = fs.statSync(filePath);
            const fileSizeInBytes = fileStats.size; // Dung lượng file tính bằng bytes
            const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2); // Dung lượng tính bằng KB (2 chữ số thập phân)

            // Đọc file PDF gốc
            const existingPdfBytes = fs.readFileSync(filePath);
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Lấy tổng số trang của file gốc
            const totalPages = pdfDoc.getPageCount();

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

            // Tạo PDF chỉ với 10% số trang hoặc tối đa 15 trang
            const shortPdfDoc = await PDFDocument.create();
            const numShortPages = Math.min(Math.max(1, Math.ceil(totalPages * 0.1)), 15); // Tính số trang
            for (let i = 0; i < numShortPages; i++) {
                const [copiedPage] = await shortPdfDoc.copyPages(pdfDoc, [i]);
                shortPdfDoc.addPage(copiedPage);

                const { width, height } = copiedPage.getSize();
                const scaledLogoWidth = width / 4;
                const scaledLogoHeight = (logoHeight / logoWidth) * scaledLogoWidth;

                copiedPage.drawImage(logoImage, {
                    x: width - scaledLogoWidth - 50,
                    y: height - scaledLogoHeight - 50,
                    width: scaledLogoWidth,
                    height: scaledLogoHeight,
                    opacity: 0.2
                });
            }

            // Lưu PDF có 10% số trang hoặc tối đa 15 trang
            const shortPdfBytes = await shortPdfDoc.save();
            const shortFilePath = path.join(uploadFolder, `short_${req.file.filename}`);
            const shortFileSave = path.join('uploads', `short_${req.file.filename}`);
            fs.writeFileSync(shortFilePath, shortPdfBytes);

            // Xóa file gốc
            fs.unlinkSync(filePath);

            const newDocument = await DocumentServices.create(
                {
                    document_title,
                    document_content: document_content ?? '',
                    store_Id,
                    document_score: +document_score,
                    format_Id,
                    document_url: modifiedFileSave,
                    document_sub: shortFileSave,
                    document_capacity: +fileSizeInKB, // Dung lượng file
                    document_page: totalPages, // Số trang file,
                    document_author,
                    document_year: +document_year
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
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            document_title,
            document_content,
            store_Id,
            document_score,
            document_author,
            document_year
        } = req.body

        const { id } = req.params

        if (!document_title || !id || isNaN(+document_score) || !store_Id || !document_author || isNaN(+document_year)) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()
        try {

            const data = {
                document_title,
                store_Id,
                document_score: +document_score,
                document_author,
                document_year: +document_year
            }

            if (document_content) {
                data.document_content = document_content
            }
            const document = await DocumentServices.update(
                data,
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
        const { page, limit, score, format, store, title, auth, year, id, order } = req.query

        try {
            const documents = await DocumentServices.getAll({
                page, limit, score, format, store, title, auth, year, id, order
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
                const filePathSub = path.join(__dirname, '../' + data.document_sub);
                if (typeof filePath === 'string' && fs.existsSync(filePath) && typeof filePathSub === 'string' && fs.existsSync(filePathSub)) {
                    fs.unlinkSync(filePath);
                    fs.unlinkSync(filePathSub);
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