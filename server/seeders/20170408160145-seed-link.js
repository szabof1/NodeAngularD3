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
        const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/graph';
        //const connectionString = process.env.DATABASE_URL || 'postgres://YourUserName:YourPassword@localhost:5432/graph';

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