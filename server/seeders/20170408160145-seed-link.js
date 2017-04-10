'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    const LinksDataJson = require('../../data/links.json');
    const LinksData = LinksDataJson.map(doc => {
        const props = Object.assign({}, doc)
        delete props.id;
        return props;
    });
    return [
      queryInterface.bulkInsert('Links', LinksData)]; // { individualHooks: true } // {returning: true}
  }
};

/*
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United States', 'United Kingdom', 0, 62);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United States', 'Canada', 0, 30);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United States', 'France', 0, 20);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United Kingdom', 'Canada', 0, 11);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United Kingdom', 'France', 0, 16);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('France', 'Canada', 0, 6);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United States', 'United Kingdom', 2014, 3);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United States', 'Canada', 2014, 2);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United States', 'France', 2014, 1);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United Kingdom', 'Canada', 2014, 2);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('United Kingdom', 'France', 2014, 1);
*/