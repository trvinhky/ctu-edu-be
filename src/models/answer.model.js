'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'student_Id',
                as: 'student'
            })

            this.belongsTo(models.Option, {
                foreignKey: 'option_Id',
                as: 'option'
            })

            this.belongsTo(models.Question, {
                foreignKey: 'question_Id',
                as: 'question'
            })
        }
    }
    Answer.init({
        answer_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        answer_correct: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        option_Id: DataTypes.STRING,
        student_Id: DataTypes.STRING,
        question_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Answer',
        tableName: 'answers',
        timestamps: false
    });
    return Answer;
};
