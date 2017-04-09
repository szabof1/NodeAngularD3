'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    const CountriesData = require('../../data/countries_continents.json');
    return [
      queryInterface.bulkInsert('Countries', CountriesData)];
  }
};