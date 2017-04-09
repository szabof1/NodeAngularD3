'use strict';
module.exports = function(sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    sourceCountry: DataTypes.STRING,
    targetCountry: DataTypes.STRING,
    year: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Link.belongsTo(models.Node, {foreignKey: 'sourceCountry', targetKey: 'country'})
        Link.belongsTo(models.Node, {foreignKey: 'targetCountry', targetKey: 'country'})
      }
    }
  });
  return Link;
};