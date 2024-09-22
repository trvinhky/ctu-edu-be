'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Result extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'student_Id',
                as: 'student'
            })

            this.belongsTo(models.Exam, {
                foreignKey: 'exam_Id',
                as: 'exam'
            })

        }
    }
    Result.init({
        student_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        exam_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        result_score: DataTypes.DOUBLE,
        result_completed: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Result',
        tableName: 'results',
        timestamps: false
    });
    return Result;
};
