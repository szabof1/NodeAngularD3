const path = require('path');
const express = require('express');
const app = express();
const models = require('../server/models/index');

app.get('/data/countries', (req, res) => {
    models.Country.findAll({})
    .then(countries => res.json(countries));
});
app.get('/data/countries/:year', (req, res) => {
    const sourceTempSql = models.sequelize.dialect.QueryGenerator.selectQuery('Links', {
        attributes: ['source_country'],
        where: { year: parseInt(req.params.year, 10) },
        group: ['source_country']
    }).slice(0, -1);
    console.log("# sourceTempSql:");
    console.log(sourceTempSql);
    const targetTempSql = models.sequelize.dialect.QueryGenerator.selectQuery('Links', {
        attributes: ['target_country'],
        where: { year: parseInt(req.params.year, 10) },
        group: ['target_country']
    }).slice(0, -1);
    console.log("# targetTempSql:");
    console.log(targetTempSql);
    models.Country.findAll({
        where: {
            country: { $or: [
                { $in: models.sequelize.literal('(' + sourceTempSql + ')') },
                { $in: models.sequelize.literal('(' + targetTempSql + ')') }
            ]}
        }
    })
    .then(countries => res.json(countries));
});
app.get('/data/links', (req, res) => {
    models.Link.findAll({})
    .then(links => res.json(links));
});
app.get('/data/links/:year', (req, res) => {
    models.Link.findAll({
        where: { year: parseInt(req.params.year, 10) }
    })
    .then(links => res.json(links));
});

app.use('/', express.static(path.join(__dirname, '../public')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });


app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    const host = (server.address().address === '::') ? 'localhost' : server.address().address
    console.log(`Node.js server is listening on ${ host }:${ server.address().port }`)
});

/*
SELECT "country", "continent" FROM "Countries" AS "Country" WHERE "Country"."year" = 1;
*/
