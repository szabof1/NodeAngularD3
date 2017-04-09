'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    const LinksDataJson = require('../../data/links.json');
    const LinksData = LinksDataJson.map(doc => {
        const props = Object.assign({}, doc)
        delete props.id;
        return props;
    });
    console.log("# LinksData:");
    console.log(LinksData);
    return [
      queryInterface.bulkInsert('Links', LinksData)]; // { individualHooks: true } // {returning: true}
  }
};

/*
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('USA', 'UK', 0, 62);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('USA', 'Canada', 0, 30);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('USA', 'France', 0, 20);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('UK', 'Canada', 0, 11);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('UK', 'France', 0, 16);
INSERT INTO "Links" (source_country, target_country, year, value) VALUES ('France', 'Canada', 0, 6);
*/