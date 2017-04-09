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
      sourceCountry: {
        type: Sequelize.STRING
      },
      targetCountry: {
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
  /*
  up: function (queryInterface, Sequelize) {
    const LinksData = require('../../data/links.json');
    return [
      queryInterface.bulkInsert('Links', LinksData)];
  },
  */
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Links');
  }
};