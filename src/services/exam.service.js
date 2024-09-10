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
    async update(exam, exam_Id) {
        return await db.Exam.update(
            exam,
            { where: { exam_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Exam.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Course,
                    as: 'course'
                }
            ]
        })
    },
    async delete(exam_Id) {
        return await db.Exam.destroy({
            where: { exam_Id }
        });
    }
}

module.exports = ExamServices