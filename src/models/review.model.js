'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            this.belongsTo(models.Course, {
                foreignKey: 'course_Id',
                as: 'course'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'student_Id',
                as: 'student'
            })
        }
    }
    Review.init({
        review_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        review_rating: DataTypes.FLOAT,
        review_comment: DataTypes.TEXT,
        course_Id: DataTypes.STRING,
        student_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: false
    });
    return Review;
};
