const express = require('express');
const router = express.Router();

const models = require('../server/models/index');

router.get('/data/countries', (req, res) => {
    models.Country.findAll({})
    .then(countries => res.json(countries));
});

router.get('/data/countries/:year', (req, res) => {
    const sourceTempSql = models.sequelize.dialect.QueryGenerator.selectQuery('Links', {
        attributes: ['source_country'],
        where: { year: parseInt(req.params.year, 10) },
        group: ['source_country']
    }).slice(0, -1);
    const targetTempSql = models.sequelize.dialect.QueryGenerator.selectQuery('Links', {
        attributes: ['target_country'],
        where: { year: parseInt(req.params.year, 10) },
        group: ['target_country']
    }).slice(0, -1);
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

router.get('/data/links', (req, res) => {
    models.Link.findAll({})
    .then(links => res.json(links));
});

router.get('/data/links/:year', (req, res) => {
    models.Link.findAll({
        where: { year: parseInt(req.params.year, 10) }
    })
    .then(links => res.json(links));
});

module.exports = router;