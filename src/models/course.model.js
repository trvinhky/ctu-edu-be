'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'teacher_Id',
                as: 'teacher'
            })

            this.belongsTo(models.Field, {
                foreignKey: 'field_Id',
                as: 'field'
            })

            this.hasMany(models.Lesson, {
                foreignKey: 'course_Id',
                as: 'lessons'
            })

            this.belongsToMany(models.Account, {
                through: models.Enrollment,
                foreignKey: 'course_Id',
                otherKey: 'student_Id'
            })

            this.hasMany(models.Exam, {
                foreignKey: 'course_Id',
                as: 'exams'
            })

            this.hasMany(models.Review, {
                foreignKey: 'course_Id',
                as: 'reviews'
            })
        }
    }
    Course.init({
        course_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        course_name: DataTypes.STRING,
        course_image: DataTypes.STRING,
        course_required: DataTypes.STRING,
        course_content: DataTypes.STRING,
        course_total: DataTypes.INTEGER,
        teacher_Id: DataTypes.STRING,
        field_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Course',
        tableName: 'courses',
        timestamps: true
    });
    return Course;
};
