'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Countries', {
      country: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      continent: {
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Countries');
  }
};