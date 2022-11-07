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
            review: {
                type: DataTypes.STRING,
                allowNull: true,
                len: {
                    args: [0, 500],
                    // msg: {
                    //     notEmpty: "this field must have a maximum of 500 characters"
                    // }
                }
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    max: 5.0,
                    min: 0.0,
                    // msg: {
                    //     notEmpty: "it should be rated between 0.0 and 5.0"  
                    // }
                },
                defaultValue: 0.0

            },
            genres: {
                type: DataTypes.ENUM,
                allowNull: true,
                values: ["romance", "action", "romantic comedy", "others"],
                defaultValue: "others"
            }

        }, {
            sequelize,
            tableName: 'kdramas_names',
            freezeTableName: true
        });
    }
}

module.exports = Kdramas;
