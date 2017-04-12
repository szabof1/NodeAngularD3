// This script was used for prepairing the links dataset

const MongoClient = require('mongodb').MongoClient;
const pg = require('pg');

const links = {};

MongoClient.connect("mongodb://localhost:27017/video")
    // find films with countries.length >= 1
    .then(db => db.collection('movieDetails').find({ 'countries.1': { $exists: true } }, { countries: 1, year: 1 }).toArray())
    .then(docs => {
        if (docs.length > 0) {
            docs.forEach((doc, i) => {
                console.log(`${i} / ${docs.length}`);
                console.log("::", doc.countries);
                const pairs = subset(doc.countries, 2, 2);
                console.log("->", pairs);
                pairs.forEach(pair => {
                    const key = `${pair[0]}:${pair[1]}:${doc.year}`;
                    links[key] = (links[key] || 0) + 1;
                });
            });
        }
    })
    //.then(() => db.close())
    .then(() => {
        let i = 0;
        console.log(JSON.stringify(links));
        console.log(Object.keys(links).length);
        return Object.keys(links).map(key => { // only one key
            console.log(`${++i}.`);
            console.info("key: ", key);
            const subKeys = key.split(':');
            console.info(JSON.stringify(subKeys), links[key]);
            const newItem = {
                source_country: subKeys[0],
                target_country: subKeys[1],
                year: parseInt(subKeys[2], 10),
                value: links[key]
            };
            return newItem;
        });
    })
    .then((finalLinks) => {
        console.log(JSON.stringify(finalLinks, null, 2), '\n', finalLinks.length);

        const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/graph';
        //const connectionString = process.env.DATABASE_URL || 'postgres://YourUserName:YourPassword@localhost:5432/graph';

        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                console.log(err);
                done();
                return;
            }

            // Insert Data
            finalLinks.forEach(link => {
                client.query('INSERT INTO "Links" (source_country, target_country, year, value) VALUES ($1, $2, $3, $4)',
                    [link.source_country, link.target_country, link.year, link.value]);
            });

            console.log("DONE");
            done();
        });
    });


function subset(arr, arr_min_size, arr_max_size) {
    var result_set = [],
        result;

    for(var x = 0; x < Math.pow(2, arr.length); x++) {
        result = [];
        i = arr.length - 1;
        do {
            if( (x & (1 << i)) !== 0) {
                result.push(arr[i]);
            }
        } while (i--);

        if (result.length >= arr_min_size && result.length <= arr_max_size && result.length <= arr.length) {
            result.sort(compare);
            result_set.push(result);
        }
    }

    result_set.sort(compareArr);
    return result_set;
}

function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

// OK because all arrays are at length of 2
function compareArr(a, b) {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] > b[0]) {
    return 1;
  }
  if (a[1] < b[1]) {
    return -1;
  }
  if (a[1] > b[1]) {
    return 1;
  }
  return 0;
}