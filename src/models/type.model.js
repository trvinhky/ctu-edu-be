'use strict';
const { Model } = require('sequelize');
const { TYPE } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        static associate(models) {
            this.hasMany(models.Resource, {
                foreignKey: 'resource_type',
                as: 'resources'
            })

            this.hasMany(models.QuestionResource, {
                foreignKey: 'resource_type',
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
            defaultValue: TYPE.FILE
        }
    }, {
        sequelize,
        modelName: 'Type',
        tableName: 'types',
        timestamps: false
    });
    return Type;
};
