const db = require("../models")

const ExamServices = {
    async create(exam) {
        return await db.Exam.create(exam)
    },
    async getOne(exam_Id) {
        return await db.Exam.findOne({
            where: { exam_Id },
            include: [
                {
                    model: db.Course,
                    as: 'course'
                }
            ]
        })
    },
    async update(exam, exam_Id, transaction) {
        await db.Exam.update(
            exam,
            { where: { exam_Id } },
            transaction
        )

        return await db.Exam.findOne({
            where: { exam_Id },
            transaction
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const course_Id = params.course ?? ''
        const where = {}

        if (course_Id) {
            where.course_Id = course_Id
        }

        const check = {
            where,
            include: [
                {
                    model: db.Course,
                    as: 'course'
                }
            ]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Exam.findAndCountAll(check)
    },
    async delete(exam_Id) {
        return await db.Exam.destroy({
            where: { exam_Id }
        });
    }
}

module.exports = ExamServices