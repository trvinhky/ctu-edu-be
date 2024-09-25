const SubjectServices = require("../services/subject.service")

const SubjectControllers = {
    async create(req, res) {
        const { subject_name } = req.body

        if (!subject_name) {
            return res.errorValid(
                'Tên môn học không được rỗng!'
            )
        }

        try {
            const newSubject = await SubjectServices.create(
                { subject_name }
            )

            if (newSubject) {
                return res.successNoData(
                    'Thêm mới môn học thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới môn học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { subject_name } = req.body
        const { id } = req.params

        if (!id || !subject_name) {
            return res.errorValid()
        }

        try {
            const subject = await SubjectServices.update(
                subject_name,
                id
            )

            if (subject) {
                return res.successNoData(
                    'Cập nhật môn học thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật môn học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id môn học không tồn tại!'
            )
        }

        try {
            const subject = await SubjectServices.getOne(id)

            if (subject) {
                return res.success(
                    'Lấy môn học thành công!',
                    subject
                )
            }

            return res.error(
                404,
                'Lấy môn học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const subjects = await SubjectServices.getAll({
                page, limit
            })

            if (subjects) {
                return res.success(
                    'Lấy tất cả môn học thành công!',
                    {
                        count: subjects.count,
                        subjects: subjects.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả môn học thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    }
}

module.exports = SubjectControllers