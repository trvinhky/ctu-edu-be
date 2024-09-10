'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Field extends Model {
        static associate(models) {
            this.hasMany(models.Course, {
                foreignKey: 'field_Id',
                as: 'courses'
            })
        }
    }
    Field.init({
        field_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        field_name: DataTypes.STRING,
        field_description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Field',
        tableName: 'fields',
        timestamps: false
    });
    return Field;
};
