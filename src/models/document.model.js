'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Document extends Model {
        static associate(models) {
            this.belongsTo(models.Format, {
                foreignKey: 'format_Id',
                as: 'format'
            })

            this.belongsTo(models.Store, {
                foreignKey: 'store_Id',
                as: 'store'
            })

            this.hasMany(models.Review, {
                foreignKey: 'document_Id',
                as: 'documents'
            })

            this.belongsToMany(models.Account, {
                through: models.Buy,
                foreignKey: 'document_Id',
                otherKey: 'account_Id'
            })
        }
    }
    Document.init({
        document_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        document_title: DataTypes.STRING,
        document_author: DataTypes.STRING,
        document_content: DataTypes.TEXT,
        document_url: DataTypes.STRING,
        document_sub: DataTypes.STRING,
        document_score: DataTypes.INTEGER,
        document_year: DataTypes.INTEGER,
        document_page: DataTypes.INTEGER,
        document_capacity: DataTypes.DOUBLE,
        format_Id: DataTypes.STRING,
        store_Id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Document',
        tableName: 'documents',
        timestamps: true
    });
    return Document;
};
