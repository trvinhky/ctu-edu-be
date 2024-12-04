'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            this.hasMany(models.Post, {
                foreignKey: 'account_Id',
                as: 'posts'
            })

            this.belongsToMany(models.Document, {
                through: models.Buy,
                foreignKey: 'account_Id',
                otherKey: 'document_Id'
            })

            this.hasMany(models.History, {
                foreignKey: 'account_Id',
                as: 'histories'
            })

            this.hasMany(models.Review, {
                foreignKey: 'account_Id',
                as: 'reviews'
            })
        }
    }
    Account.init({
        account_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        account_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        account_password: DataTypes.STRING,
        account_token: DataTypes.STRING,
        account_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        account_band: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        account_score: DataTypes.INTEGER,
        account_name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: true,
    });
    return Account;
};
