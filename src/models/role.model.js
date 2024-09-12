'use strict';
const { Model } = require('sequelize');
const { ROLES } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            this.hasMany(models.Account, {
                foreignKey: 'role_Id',
                as: 'accounts'
            })
        }
    }
    Role.init({
        role_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        role_name: {
            type: DataTypes.STRING,
            defaultValue: ROLES.USER
        },
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'role',
        timestamps: false,
    });
    return Role;
};
