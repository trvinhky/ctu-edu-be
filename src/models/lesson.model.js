'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        static associate(models) {
            this.belongsTo(models.Course, {
                foreignKey: 'course_Id',
                as: 'course'
            })

            this.hasMany(models.Resource, {
                foreignKey: 'lesson_Id',
                as: 'resources'
            })

            this.hasMany(models.Discussion, {
                foreignKey: 'lesson_Id',
                as: 'discussions'
            })
        }
    }
    Lesson.init({
        lesson_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        lesson_title: DataTypes.STRING,
        lesson_content: DataTypes.TEXT,
        course_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Lesson',
        tableName: 'lessons',
        timestamps: false
    });
    return Lesson;
};
