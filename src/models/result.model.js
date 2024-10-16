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
        result_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        result_completed: DataTypes.DATE,
        student_Id: DataTypes.STRING,
        exam_Id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Result',
        tableName: 'results',
        timestamps: false
    });
    return Result;
};
