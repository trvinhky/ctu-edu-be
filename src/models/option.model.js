'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        static associate(models) {
            this.belongsTo(models.Question, {
                foreignKey: 'question_Id',
                as: 'question'
            })

            this.hasMany(models.Answer, {
                foreignKey: 'option_Id',
                as: 'answers'
            })
        }
    }
    Option.init({
        option_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        option_content: DataTypes.STRING,
        option_is_correct: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        question_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Option',
        tableName: 'options',
        timestamps: false
    });
    return Option;
};
