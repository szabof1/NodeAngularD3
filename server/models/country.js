'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    country: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    continent: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Country.hasMany(
            models.Link,
            { as: 'SourceLinks' },
            { foreignKey: 'sourceCountry' }
        );
        Country.hasMany(
            models.Link,
            { as: 'TargetLinks' },
            { foreignKey: 'targetCountry' }
        );
      }
    }
  });
  return Country;
};