'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source_country: {
        type: Sequelize.STRING
      },
      target_country: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Links');
  }
};