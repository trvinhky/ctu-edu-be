'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        static associate(models) {
            this.hasMany(models.Document, {
                foreignKey: 'store_Id',
                as: 'documents'
            })
        }
    }
    Store.init({
        store_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        store_title: DataTypes.STRING,
        store_image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Store',
        tableName: 'stores',
        timestamps: false
    });
    return Store;
};
