'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            this.belongsTo(models.Status, {
                foreignKey: 'status_Id',
                as: 'status'
            })

            this.belongsTo(models.Subject, {
                foreignKey: 'subject_Id',
                as: 'subject'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'auth_Id',
                as: 'auth'
            })
        }
    }
    Post.init({
        post_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        post_title: DataTypes.STRING,
        post_content: DataTypes.TEXT,
        status_Id: DataTypes.STRING,
        subject_Id: DataTypes.STRING,
        auth_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
    });
    return Post;
};
