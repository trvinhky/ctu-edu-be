'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
            })

            this.belongsTo(models.Document, {
                foreignKey: 'document_Id',
                as: 'document'
            })
        }
    }
    Review.init({
        review_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        review_ratings: DataTypes.FLOAT,
        review_content: DataTypes.TEXT,
        document_Id: DataTypes.STRING,
        account_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: true
    });
    return Review;
};
