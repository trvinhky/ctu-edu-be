'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'account_Id',
                as: 'account'
            })
        }
    }
    Profile.init({
        profile_Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        profile_name: DataTypes.STRING,
        profile_address: DataTypes.STRING,
        profile_phone: DataTypes.STRING,
        profile_avatar: DataTypes.STRING,
        profile_birthday: DataTypes.DATE,
        profile_info: DataTypes.TEXT,
        account_Id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Profile',
        tableName: 'profiles',
        timestamps: false
    });
    return Profile;
};
