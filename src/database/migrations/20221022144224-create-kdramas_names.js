'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('kdramas_names', 
    {
     id:{
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
      },
      drama_name: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      favorite_character: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      streamming_services: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      release_year: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      }, 
      updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
     }

   });
  },

  async down (queryInterface, Sequelize) {
    
    return await queryInterface.dropTable('kdramas_names');
  }
};
