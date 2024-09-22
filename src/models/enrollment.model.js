'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Enrollment extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'student_Id',
                as: 'student'
            })

            this.belongsTo(models.Course, {
                foreignKey: 'course_Id',
                as: 'course'
            })
        }
    }
    Enrollment.init({
        course_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        student_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        enrollment_date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Enrollment',
        tableName: 'enrollments',
        timestamps: false
    });
    return Enrollment;
};
