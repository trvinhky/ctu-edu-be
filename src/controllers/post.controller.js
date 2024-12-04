const db = require("../models")
const PostServices = require("../services/post.service")
const StatusServices = require("../services/status.service")
const AccountServices = require("../services/account.service")
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const PostControllers = {
    async create(req, res) {
        const {
            post_title,
            post_content,
            format_Id,
            account_Id,
            post_year,
            post_author
        } = req.body

        if (!post_title || !post_content || !format_Id || !account_Id || !req.file || isNaN(+post_year) || !post_author) {
            return res.errorValid()
        }

        try {
            const status_Id = (await StatusServices.getOne({ status_index: 0 })).status_Id
            const filePath = path.resolve(__dirname, '../uploads', req.file.filename)
            const filePathSave = path.join('uploads', req.file.filename)

            // Kiểm tra sự tồn tại của file
            if (!fs.existsSync(filePath)) {
                return res.error(
                    404,
                    'File không tồn tại!'
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

            // Tạo PDF chỉ với 10% số trang hoặc tối đa 15 trang
            const shortPdfDoc = await PDFDocument.create();
            const numShortPages = Math.min(Math.max(1, Math.ceil(totalPages * 0.1)), 15); // Tính số trang
            for (let i = 0; i < numShortPages; i++) {
                const [copiedPage] = await shortPdfDoc.copyPages(pdfDoc, [i]);
                shortPdfDoc.addPage(copiedPage);
            }

            // Lưu PDF có 10% số trang hoặc tối đa 15 trang
            const shortPdfBytes = await shortPdfDoc.save();
            const uploadFolder = path.join(__dirname, '../uploads');
            const shortFilePath = path.join(uploadFolder, `short_${req.file.filename}`);
            const shortFileSave = path.join('uploads', `short_${req.file.filename}`);
            fs.writeFileSync(shortFilePath, shortPdfBytes);

            if (!status_Id) {
                return res.error(
                    404,
                    'Thêm mới bài đăng thất bại!'
                )
            }

            const newPost = await PostServices.create(
                {
                    post_title,
                    post_content,
                    status_Id,
                    format_Id,
                    account_Id,
                    post_author,
                    post_sub: shortFileSave,
                    post_capacity: +fileSizeInKB, // Dung lượng file
                    post_page: totalPages,
                    post_year: +post_year,
                    post_url: filePathSave
                }
            )

            if (newPost) {
                return res.successNoData(
                    'Thêm mới bài đăng thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { id } = req.params

        const {
            post_title,
            post_content,
            status_Id,
            post_year,
            post_author
        } = req.body

        if (!id || !post_title || !post_content || !status_Id || isNaN(+post_year) || !post_author) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const pendingId = (await StatusServices.getOne({ status_index: 0 })).status_Id
            const confirmId = (await StatusServices.getOne({ status_index: 1 })).status_Id

            if (!pendingId || confirmId !== status_Id) {
                return res.error(
                    404,
                    'Cập nhật trạng thái thất bại!'
                )
            }

            const post = await PostServices.update(
                {
                    post_title,
                    post_content,
                    status_Id,
                    post_author,
                    post_year: +post_year
                },
                id,
                transaction
            )

            if (post) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật bài đăng thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật bài đăng thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, status, account, title, format, index, auth, year, id, month } = req.query

        try {
            const posts = await PostServices.getAll({
                page, limit, status, account, title, format, index, auth, year, id, month
            })

            if (posts) {
                return res.success(
                    'Lấy tất cả bài đăng thành công!',
                    {
                        count: posts.count,
                        posts: posts.rows
                    }
                )
            }

            return rres.error(
                404,
                'Lấy tất cả bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài đăng không tồn tại!'
            )
        }

        try {
            const post = await PostServices.getOne(id)

            if (post) {
                return res.success(
                    'Lấy bài đăng thành công!',
                    post
                )
            }

            return res.error(
                404,
                'Lấy bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id bài thi và Id câu hỏi không tồn tại!'
            )
        }

        try {
            const info = await PostServices.getOne(id)

            if (!info || (info && info?.status?.status_index === 1)) {
                return res.error(
                    404,
                    'Trạng thái bài đăng không hợp lệ!'
                )
            }

            const post = await PostServices.getOne(id)
            if (post) {
                const filePath = path.join(__dirname, '../' + data.post_url);
                if (typeof filePath === 'string' && fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    const check = await PostServices.delete(id)

                    if (check) {
                        return res.successNoData(
                            'Xóa bài đăng thành công!'
                        )
                    }
                }
            }

            return res.error(
                404,
                'Xóa bài đăng thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async updateStatus(req, res) {
        const { id } = req.params
        const { status_index, score, account_Id } = req.body

        if (!id || ![0, 1, -1].includes(+status_index)) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const confirmId = (await StatusServices.getOne({ status_index: 1 })).status_Id
            const status_Id = (await StatusServices.getOne({ status_index: +status_index })).status_Id

            if (!confirmId) {
                return res.error(
                    404,
                    'Không kiểm tra được trạng thái!'
                )
            }

            if (!status_Id) {
                return res.error(
                    404,
                    'Lấy Id trạng thái bài đăng thất bại!'
                )
            }

            let flag = 0

            if (confirmId === status_Id) {
                if (!account_Id) {
                    await transaction.rollback()
                    return res.errorValid('Không tồn tại Id tài khoản!')
                }
                const account = await AccountServices.getOne({ account_Id })
                if (!account) {
                    await transaction.rollback()
                    return res.error(404, 'Không tồn tại tài khoản!')
                }

                const isUpdate = await AccountServices.updateScore(
                    parseInt(score),
                    { account_Id }
                )

                if (isUpdate) flag = 1
            }
            if (flag === 1) {
                const post = await PostServices.update(
                    { status_Id },
                    id,
                    transaction
                )

                if (post) {
                    await transaction.commit()
                    return res.successNoData(
                        'Cập nhật trạng thái bài đăng thành công!'
                    )
                }
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật trạng thái bài đăng thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    }
}

module.exports = PostControllers