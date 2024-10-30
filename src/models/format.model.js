'use strict';
const { Model } = require('sequelize');
const { FORMATS, ACCEPT, DESCRIPTIONS } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Format extends Model {
        static associate(models) {
            this.hasMany(models.Document, {
                foreignKey: 'format_Id',
                as: 'documents'
            })

            this.hasMany(models.Post, {
                foreignKey: 'format_Id',
                as: 'posts'
            })
        }
    }
    Format.init({
        format_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        format_name: {
            type: DataTypes.STRING,
            defaultValue: FORMATS.IMAGE
        },
        format_accept: {
            type: DataTypes.STRING,
            defaultValue: ACCEPT.IMAGE
        },
        format_description: {
            type: DataTypes.STRING,
            defaultValue: DESCRIPTIONS.IMAGE
        }
    }, {
        sequelize,
        modelName: 'Format',
        tableName: 'formats',
        timestamps: false
    });
    return Format;
};
