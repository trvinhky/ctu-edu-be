'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        static associate(models) {
            this.belongsTo(models.Recharge, {
                foreignKey: 'recharge_Id',
                as: 'recharge'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
            })
        }
    }
    History.init({
        history_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        history_createdAt: DataTypes.DATE,
        recharge_Id: DataTypes.STRING,
        account_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'History',
        tableName: 'histories',
        timestamps: false
    });
    return History;
};
