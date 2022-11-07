'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return await Promise.all([
      queryInterface.addColumn(
        'kdramas_names',
        'genres',
        {
          type: Sequelize.ENUM("romance", "action", "romantic comedy", "others"),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'kdramas_names', 
        'review', 
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
        queryInterface.addColumn(
          'kdramas_names',
          'rating',
          {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
        ),
    ])

  },

  async down (queryInterface, Sequelize) {

    return await Promise.all([
      queryInterface.removeColumn('kdramas_names', 'genres'),
      queryInterface.removeColumn('kdramas_names', 'review'),
      queryInterface.removeColumn('kdramas_names', 'rating'),
    ]);

  }
};
