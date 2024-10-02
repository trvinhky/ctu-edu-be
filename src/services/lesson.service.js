const db = require("../models")

const LessonServices = {
    async create(lesson) {
        return await db.Lesson.create(lesson)
    },
    async update(lesson, lesson_Id, transaction) {
        await db.Lesson.update(
            lesson,
            { where: { lesson_Id } },
            transaction
        )

        return await db.Lesson.findOne({
            where: { lesson_Id },
            transaction
        })
    },
    async getOne(lesson_Id) {
        return await db.Lesson.findOne({
            where: { lesson_Id },
            include: [
                {
                    model: db.Resource,
                    as: 'resources'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const course_Id = params.id
        const where = {}

        if (course_Id) where.course_Id = course_Id

        return await db.Lesson.findAndCountAll({
            limit,
            offset,
            where,
            include: [
                {
                    model: db.Resource,
                    as: 'resources'
                }
            ]
        })
    },
    async delete(lesson_Id) {
        return await db.Lesson.destroy({
            where: { lesson_Id }
        });
    }
}

module.exports = LessonServices