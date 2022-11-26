'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.createTable('users', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }

    })
  },

  async down (queryInterface, Sequelize) {
    
    return await queryInterface.dropTable('users');

  }
};
