const { Model, DataTypes } = require('sequelize');

class Kdramas extends Model {
    static init(sequelize) {
        super.init({

            drama_name: {
                type:  DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "this field cannot be empty"
                    },
                }
            },
           
            favorite_character: {
                type:  DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "this field cannot be empty"
                    },
                }
            },

            streamming_services: {
                type:  DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "this field cannot be empty"
                    },
                }
            },
            release_year: {
                type:  DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "this field cannot be empty"
                    },
                }
            },

        }, {
            sequelize,
            tableName: 'kdramas_names',
            freezeTableName: true
        });
    }
}

module.exports = Kdramas;
