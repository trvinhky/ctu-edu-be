const db = require("../models")

const SubjectServices = {
    async create(subject) {
        return await db.Subject.create(subject)
    },
    async update(subject_name, subject_Id) {
        const subject = await db.Subject.findOne(
            { where: { subject_Id } }
        )

        if (subject) {
            subject.subject_name = subject_name
            return await subject.save()
        }

        return null
    },
    async getOne(subject_Id) {
        return await db.Subject.findOne({
            where: { subject_Id },
            include: [
                {
                    model: db.Course,
                    as: 'courses'
                },
                {
                    model: db.Post,
                    as: 'posts'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;

        return await db.Subject.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: db.Course,
                    as: 'courses'
                },
                {
                    model: db.Post,
                    as: 'posts'
                }
            ]
        })
    }
}

module.exports = SubjectServices