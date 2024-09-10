'use strict';
const { Model } = require('sequelize');
const { CATEGORY } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            this.hasMany(models.Question, {
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
            type: DataTypes.ENUM,
            values: Object.values(CATEGORY),
            defaultValue: CATEGORY.ONE
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: false
    });
    return Category;
};
