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
                    model: db.Category,
                    as: 'category'
                }
            ]
        })
    },
    async getAll(params) {
        const page = parseInt(params?.page);
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const course_Id = params.id
        const lesson_score = isNaN(+params.score) && +params.score
        const where = {}

        if (course_Id) where.course_Id = course_Id
        if (lesson_score) where.lesson_score = { [db.Sequelize.Op.lte]: lesson_score }

        const check = {
            where,
            include: [
                {
                    model: db.Category,
                    as: 'category'
                }
            ]
        }

        if (page) {
            check.offset = offset
            check.limit = limit
        }

        return await db.Lesson.findAndCountAll(check)
    },
    async delete(lesson_Id) {
        return await db.Lesson.destroy({
            where: { lesson_Id }
        });
    }
}

module.exports = LessonServices