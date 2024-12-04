'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            this.belongsTo(models.Status, {
                foreignKey: 'status_Id',
                as: 'status'
            })

            this.belongsTo(models.Format, {
                foreignKey: 'format_Id',
                as: 'format'
            })

            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
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
        post_url: DataTypes.STRING,
        post_sub: DataTypes.STRING,
        post_year: DataTypes.INTEGER,
        post_page: DataTypes.INTEGER,
        post_capacity: DataTypes.DOUBLE,
        post_author: DataTypes.STRING,
        status_Id: DataTypes.STRING,
        format_Id: DataTypes.STRING,
        account_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
    });
    return Post;
};
