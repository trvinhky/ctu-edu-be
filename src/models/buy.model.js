'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Buy extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'student_Id',
                as: 'student'
            })

            this.belongsTo(models.Lesson, {
                foreignKey: 'lesson_Id',
                as: 'lesson'
            })
        }
    }
    Buy.init({
        lesson_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        student_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        buy_date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Buy',
        tableName: 'buy',
        timestamps: false
    });
    return Buy;
};
