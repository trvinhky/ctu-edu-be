'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuestionExam extends Model {
        static associate(models) {
        }
    }
    QuestionExam.init({
        exam_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        question_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        question_exam_score: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'QuestionExam',
        tableName: 'question_exam',
        timestamps: false
    });
    return QuestionExam;
};
