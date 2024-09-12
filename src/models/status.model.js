'use strict';
const { Model } = require('sequelize');
const { STATUS } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Status extends Model {
        static associate(models) {
            this.hasMany(models.Post, {
                foreignKey: 'status_Id',
                as: 'posts'
            })
        }
    }
    Status.init({
        status_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        status_name: {
            type: DataTypes.ENUM,
            values: Object.values(STATUS),
            defaultValue: STATUS.PENDING
        }
    }, {
        sequelize,
        modelName: 'Status',
        tableName: 'status',
        timestamps: false
    });
    return Status;
};
