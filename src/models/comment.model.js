'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            this.belongsTo(models.Post, {
                foreignKey: 'post_Id',
                as: 'post'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
            })

            this.belongsTo(models.Comment, {
                foreignKey: 'parent_Id',
                as: 'parent'
            })

            this.hasMany(models.Comment, {
                foreignKey: 'parent_Id',
                as: 'replies'
            })
        }
    }
    Comment.init({
        comment_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        comment_content: DataTypes.TEXT,
        post_Id: DataTypes.STRING,
        account_Id: DataTypes.STRING,
        parent_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: false
    });
    return Comment;
};
