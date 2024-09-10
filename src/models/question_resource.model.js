'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuestionResource extends Model {
        static associate(models) {
            this.belongsTo(models.Type, {
                foreignKey: 'resource_type',
                as: 'type'
            })

            this.belongsTo(models.Question, {
                foreignKey: 'question_Id',
                as: 'question'
            })
        }
    }
    QuestionResource.init({
        question_resource_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        question_resource_url: DataTypes.STRING,
        resource_type: DataTypes.STRING,
        question_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'QuestionResource',
        tableName: 'question_resource',
        timestamps: false
    });
    return QuestionResource;
};
