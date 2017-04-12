const readline = require('readline');
const fs = require('fs');
const pg = require('pg');

'use strict';
module.exports = {
// Unfortunately did not work, data were not loaded this way:
//   up: function (queryInterface, Sequelize) {
//     const LinksDataJson = require('../../data/links.json');
//     const LinksData = LinksDataJson.map(doc => {
//         const props = Object.assign({}, doc)
//         delete props.id;
//         return props;
//     });
//     return [
//       queryInterface.bulkInsert('Links', LinksData)]; // { individualHooks: true } // {returning: true}
//   }
    up: function (queryInterface, Sequelize) {
        //const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/graph';
        //const connectionString = process.env.DATABASE_URL || 'postgres://YourUserName:YourPassword@localhost:5432/graph';
        const connectionString = process.env.DATABASE_URL || 'postgres://postgres:suni1X2c@localhost:5432/graph';

        return new Promise((resolve, reject) => {
            pg.connect(connectionString, (err, client, done) => {
                console.log('pg.connect');
                if (err) {
                    console.log(err);
                    done();
                    reject(err);
                }

                // Delete old data
                console.log('DELETE FROM "Links";');
                client.query('DELETE FROM "Links";')
                .then(() => {
                    const rl = readline.createInterface({
                        input : fs.createReadStream('./data/links.sql'),
                        output: process.stdout,
                        terminal: false
                    });

                    // Insert Data
                    const insertPromises = [];

                    rl.on('line', sql => {
                        console.log(sql);
                        insertPromises.push(client.query(sql));
                    });

                    rl.on('error', err => console.log(`ERROR:: ${err}`));

                    rl.on('close', () => {
                        console.log('INSERTING DATA:');
                        Promise.all(insertPromises)
                            .then(results => {
                                console.log('DONE');
                                done();
                                client.end();
                                resolve();
                            })
                            .catch(err => console.log(`ERROR:: ${err}`));
                    });
                });

            });
        });
    }
};

/* Sample data:
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