'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Buy extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
            })

            this.belongsTo(models.Document, {
                foreignKey: 'document_Id',
                as: 'document'
            })
        }
    }
    Buy.init({
        document_Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        account_Id: {
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
