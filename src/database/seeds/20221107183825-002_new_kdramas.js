'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kdramas_names', [{
      drama_name: "Vagabond",
      favorite_character: "Go Hae-ri",
      streamming_services: "Netflix",
      release_year: "2019",
      review: "The best action kdrama I ever watched",
      rating: 4.3,
      genres: "action",
      created_at:new Date(),
      updated_at:new Date()

   }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('kdramas_names', null, {});

  }
};
