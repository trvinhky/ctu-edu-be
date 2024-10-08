'use strict';
const { Model } = require('sequelize');
const { TYPE } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        static associate(models) {
            this.hasMany(models.Question, {
                foreignKey: 'type_Id',
                as: 'questions'
            })
        }
    }
    Type.init({
        type_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        type_name: {
            type: DataTypes.ENUM,
            values: Object.values(TYPE),
            defaultValue: TYPE.ONE
        }
    }, {
        sequelize,
        modelName: 'Type',
        tableName: 'types',
        timestamps: false
    });
    return Type;
};
