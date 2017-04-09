'use strict';
module.exports = function(sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    source_country: DataTypes.STRING,
    target_country: DataTypes.STRING,
    year: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Link.belongsTo(models.Country, {foreignKey: 'source_country', targetKey: 'country'});
        Link.belongsTo(models.Country, {foreignKey: 'target_country', targetKey: 'country'});
      }
    }
  });
  return Link;
};