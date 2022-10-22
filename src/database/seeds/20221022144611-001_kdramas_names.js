'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('kdramas_names', [{
        drama_name: "Her private life",
        favorite_character: "Sung Deok-mi",
        streamming_services: "Netflix",
        release_year: "2019",
        created_at:new Date(),
        updated_at:new Date()

     }], {});
  },

  async down (queryInterface, Sequelize) {
    
   await queryInterface.bulkDelete('kdramas_names', null, {});
    
  }
};
