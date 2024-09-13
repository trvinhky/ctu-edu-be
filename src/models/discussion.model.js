'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Discussion extends Model {
        static associate(models) {
            this.belongsTo(models.Lesson, {
                foreignKey: 'lesson_Id',
                as: 'lesson'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
            })

            this.belongsTo(models.Discussion, {
                foreignKey: 'parent_Id',
                as: 'parent'
            })

            this.hasMany(models.Discussion, {
                foreignKey: 'parent_Id',
                as: 'replies'
            })
        }
    }
    Discussion.init({
        discussion_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        discussion_comment: DataTypes.TEXT,
        lesson_Id: DataTypes.STRING,
        account_Id: DataTypes.STRING,
        parent_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Discussion',
        tableName: 'discussions',
        timestamps: true
    });
    return Discussion;
};
