'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Resource extends Model {
        static associate(models) {
            this.belongsTo(models.Lesson, {
                foreignKey: 'lesson_Id',
                as: 'lessons'
            })

            this.belongsTo(models.Category, {
                foreignKey: 'category_Id',
                as: 'category'
            })

            this.belongsToMany(models.Account, {
                through: models.Buy,
                foreignKey: 'resource_Id',
                otherKey: 'student_Id'
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
        resource_score: DataTypes.INTEGER,
        category_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Resource',
        tableName: 'resources',
        timestamps: false
    });
    return Resource;
};
