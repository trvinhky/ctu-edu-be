'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            this.hasOne(models.Profile, {
                foreignKey: 'account_Id',
                as: 'profile'
            })

            this.hasMany(models.Course, {
                foreignKey: 'teacher_Id',
                as: 'courses'
            })

            this.hasMany(models.Post, {
                foreignKey: 'auth_Id',
                as: 'posts'
            })

            this.hasMany(models.Comment, {
                foreignKey: 'account_Id',
                as: 'comments'
            })

            this.hasMany(models.Question, {
                foreignKey: 'auth_Id',
                as: 'questions'
            })

            this.belongsTo(models.Role, {
                foreignKey: 'role_Id',
                as: 'role'
            })

            this.hasMany(models.Answer, {
                foreignKey: 'student_Id',
                as: 'answers'
            })

            this.belongsToMany(models.Course, {
                through: models.Enrollment,
                foreignKey: 'student_Id',
                otherKey: 'course_Id'
            })

            this.belongsToMany(models.Exam, {
                through: models.Result,
                foreignKey: 'student_Id',
                otherKey: 'exam_Id'
            })

            this.hasMany(models.Discussion, {
                foreignKey: 'account_Id',
                as: 'discussions'
            })

            this.hasMany(models.Review, {
                foreignKey: 'student_Id',
                as: 'reviews'
            })
        }
    }
    Account.init({
        account_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        account_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        account_password: DataTypes.STRING,
        account_token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        role_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Account',
        tableName: 'account',
        timestamps: true,
    });
    return Account;
};
