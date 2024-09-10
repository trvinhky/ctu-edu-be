'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        static associate(models) {
            this.belongsTo(models.Category, {
                foreignKey: 'category_Id',
                as: 'category'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'auth_Id',
                as: 'auth'
            })

            this.hasMany(models.QuestionResource, {
                foreignKey: 'question_Id',
                as: 'resources'
            })

            this.hasMany(models.Option, {
                foreignKey: 'question_Id',
                as: 'options'
            })

            this.hasMany(models.Answer, {
                foreignKey: 'question_Id',
                as: 'answers'
            })

            this.belongsToMany(models.Exam, {
                through: models.QuestionExam,
                foreignKey: 'question_Id',
                otherKey: 'exam_Id'
            })
        }
    }
    Question.init({
        question_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        question_content: DataTypes.TEXT,
        category_Id: DataTypes.STRING,
        auth_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Question',
        tableName: 'questions',
        timestamps: false
    });
    return Question;
};
