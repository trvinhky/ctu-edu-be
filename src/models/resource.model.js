'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Resource extends Model {
        static associate(models) {
            this.belongsTo(models.Lesson, {
                foreignKey: 'lesson_Id',
                as: 'lessons'
            })

            this.belongsTo(models.Type, {
                foreignKey: 'resource_type',
                as: 'type'
            })
        }
    }
    Resource.init({
        resource_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        resource_url: DataTypes.STRING,
        lesson_Id: DataTypes.STRING,
        resource_type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Resource',
        tableName: 'resources',
        timestamps: false
    });
    return Resource;
};
