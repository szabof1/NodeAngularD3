'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    country: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    continent: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Country.hasMany(
            models.Link,
            { foreignKey: 'source_country' }
        );
        Country.hasMany(
            models.Link,
            { foreignKey: 'target_country' }
        );
      }
    }
  });
  return Country;
};