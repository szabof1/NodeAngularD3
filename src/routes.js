const express = require('express');
const router = express.Router();

const models = require('../server/models/index');

router.get('/data/countries/:year', (req, res) => {

    const year = parseInt(req.params.year, 10);
    const filter = (year) ? { year } : {};

    const sourceTempSql = models.sequelize.dialect.QueryGenerator.selectQuery('Links', {
        attributes: ['source_country'],
        where: filter,
        group: ['source_country']
    }).slice(0, -1);

    const targetTempSql = models.sequelize.dialect.QueryGenerator.selectQuery('Links', {
        attributes: ['target_country'],
        where: filter,
        group: ['target_country']
    }).slice(0, -1);

    models.Country.findAll({
        where: {
            country: { $or: [
                { $in: models.sequelize.literal('(' + sourceTempSql + ')') },
                { $in: models.sequelize.literal('(' + targetTempSql + ')') }
            ]}
        }
    }).then(countries => res.json(countries));

});

router.get('/data/links/:year', (req, res) => {

    const year = parseInt(req.params.year, 10);
    const filter = (year) ? { year } : {};

    models.Link.findAll({
        where: filter
    }).then(links => res.json(links));

});

module.exports = router;