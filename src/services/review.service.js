const db = require("../models")

const ReviewServices = {
    async create(review) {
        return await db.Review.create(review)
    },
    async getOne(review_Id) {
        return await db.Review.findOne({
            where: { review_Id },
            include: [
                {
                    model: db.Course,
                    as: 'course'
                },
                {
                    model: db.Account,
                    as: 'student',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'role_Id'
                        ]
                    },
                    include: [
                        {
                            model: db.Profile,
                            as: 'profile'
                        }
                    ]
                }
            ]
        })
    },
    async update(review, review_Id) {
        return await db.Review.update(
            review,
            { where: { review_Id } }
        )
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const student_Id = params.student ?? ''
        const course_Id = params.course ?? ''

        return await db.Review.findAndCountAll({
            limit,
            offset,
            where: { student_Id, course_Id },
            include: [
                {
                    model: db.Course,
                    as: 'course'
                },
                {
                    model: db.Account,
                    as: 'student',
                    attributes: {
                        exclude: [
                            'account_password',
                            'account_token',
                            'role_Id'
                        ]
                    },
                    include: [
                        {
                            model: db.Profile,
                            as: 'profile'
                        }
                    ]
                }
            ]
        })
    },
    async delete(review_Id) {
        return await db.Review.destroy({
            where: { review_Id }
        });
    }
}

module.exports = ReviewServices