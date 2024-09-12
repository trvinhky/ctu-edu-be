'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        static associate(models) {
            this.hasMany(models.Course, {
                foreignKey: 'subject_Id',
                as: 'courses'
            })

            this.hasMany(models.Post, {
                foreignKey: 'subject_Id',
                as: 'posts'
            })
        }
    }
    Subject.init({
        subject_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        subject_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Subject',
        tableName: 'subjects',
        timestamps: false
    });
    return Subject;
};
