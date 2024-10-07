'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        static associate(models) {
            this.belongsTo(models.Course, {
                foreignKey: 'course_Id',
                as: 'course'
            })

            this.belongsToMany(models.Account, {
                through: models.Result,
                foreignKey: 'exam_Id',
                otherKey: 'student_Id'
            })

            this.belongsToMany(models.Question, {
                through: models.QuestionExam,
                foreignKey: 'exam_Id',
                otherKey: 'question_Id'
            })
        }
    }
    Exam.init({
        exam_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        exam_title: DataTypes.STRING,
        exam_description: DataTypes.TEXT,
        exam_total_score: DataTypes.DOUBLE,
        exam_limit: DataTypes.INTEGER,
        course_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Exam',
        tableName: 'exams',
        timestamps: false
    });
    return Exam;
};
