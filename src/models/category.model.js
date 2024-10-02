'use strict';
const { Model } = require('sequelize');
const { CATEGORY, ACCEPT, DESCRIPTION } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            this.hasMany(models.Resource, {
                foreignKey: 'category_Id',
                as: 'resources'
            })

            this.hasMany(models.QuestionResource, {
                foreignKey: 'category_Id',
                as: 'questions'
            })
        }
    }
    Category.init({
        category_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING,
            defaultValue: CATEGORY.IMAGE
        },
        category_accept: {
            type: DataTypes.STRING,
            defaultValue: ACCEPT.IMAGE
        },
        category_description: {
            type: DataTypes.STRING,
            defaultValue: DESCRIPTION.IMAGE
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: false
    });
    return Category;
};
