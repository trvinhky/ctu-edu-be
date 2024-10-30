const db = require("../models");
const BuyServices = require("../services/buy.service");
const DocumentServices = require("../services/document.service")
const path = require('path');
const fs = require('fs');

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
            let filePath
            filePath = path.join('uploads', req.file.filename)

            const newDocument = await DocumentServices.create(
                {
                    document_title,
                    document_content: document_content ?? '',
                    store_Id,
                    document_score: +document_score,
                    format_Id,
                    document_url: filePath
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

            if (checkValid) {
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