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
  /*
  up: function (queryInterface, Sequelize) {
    const CountriesData = require('../../data/countries_continents.json');
    return [
      queryInterface.bulkInsert('Countries', CountriesData)];
  },
  */
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Countries');
  }
};