'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        static associate(models) {
            this.belongsTo(models.Course, {
                foreignKey: 'course_Id',
                as: 'course'
            })

            this.belongsTo(models.Category, {
                foreignKey: 'category_Id',
                as: 'category'
            })

            this.belongsToMany(models.Account, {
                through: models.Buy,
                foreignKey: 'lesson_Id',
                otherKey: 'student_Id'
            })
        }
    }
    Lesson.init({
        lesson_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        lesson_title: DataTypes.STRING,
        lesson_content: DataTypes.TEXT,
        lesson_url: DataTypes.STRING,
        lesson_score: DataTypes.INTEGER,
        course_Id: DataTypes.STRING,
        category_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Lesson',
        tableName: 'lessons',
        timestamps: false
    });
    return Lesson;
};
