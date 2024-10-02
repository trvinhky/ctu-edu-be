'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Recharge extends Model {
        static associate(models) {
        }
    }
    Recharge.init({
        recharge_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        recharge_money: DataTypes.INTEGER,
        recharge_score: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Recharge',
        tableName: 'recharges',
        timestamps: false,
    });
    return Recharge;
};
