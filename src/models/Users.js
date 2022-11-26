const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(sequelize) {
        super.init({
            
            userName: {
                type:  DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "this field cannot be empty"
                    },
                }
            },
            email: {
                type:  DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: "It should be an email"
                    }
                }
            }, 
            password: {
                type:  DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "this field cannot be empty"
                    },
                }
            }

        }, {
            sequelize,
            tableName: 'users',
            freezeTableName: true,
            underscored: false,
            timestamps: false
       });
    }
}

module.exports = Users;