'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Buy extends Model {
        static associate(models) {
        }
    }
    Buy.init({
        resource_Id: {
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
