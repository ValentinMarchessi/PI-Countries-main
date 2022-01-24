const router = require('express').Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db.js')

router.get('/', async function (req, res) {
    const { name, page } = req.query;

    if (!await Country.count()) {
        console.log('Countries table is empty, fetching countries from external API.');
        const { status, data } = await axios('https://restcountries.com/v3/all');
        data.forEach(function (country) {
            const { cca3, name, flags, region, capital } = country;
            Country.create({
                id: cca3,
                name: name.common,
                flag: flags[0],
                continent: region,
                capital: capital ? capital[0] : 'unavailable', 
            });
        })
        console.log('Syncing countries table...');
        await Country.sync({ alter: true });
    }

    if (Object.keys(req.query).length) {
        if (name) {
            try {
                console.log(await Country.count());
                const query_result = await Country.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `${name}%`,
                        },
                    }
                }).catch(err => console.error(err));
                query_result.length ?
                    res.json(query_result) :
                    res.status(400).json({ error: 'Could not find countries for the given query.' });
            } catch (err) {
                console.error(err);
                res.status(400).send(err);
            }
        }
        if (page) {
            const { count, rows } = await Country.findAndCountAll({
                offset: 10 * (page - 1),
                limit: 10,
            }).catch(function (err) {console.log(err)});
            count ? res.status(200).send(rows) : res.sendStatus(400);
        }
    }
    else try { 
        country_array = await Country.findAll({
            attributes: ['name']
        })
        country_array.length ? res.status(200).json(country_array) : res.sendStatus(400);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

router.get('/:countryId', async function (req, res){
    try {
        const { countryId } = req.params;
        const { data } = await axios.get(`https://restcountries.com/v3/alpha/${countryId}`);
        const { cca3, name, flags, region, capital, subregion, area, population } = data[0];
        const activities = await Activity.findAll({
            include: [{
                model: Country,
                through: {
                    where: { countryId },
                }
            }]
        })
        data ? res.json({
            id: cca3,
            name,
            flags,
            continent: region,
            capital,
            subregion,
            area,
            population,
            activities
        })
            : res.sendStatus(400);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

router.get('/page/:num', async function (req, res) {
    const { num } = req.params
    const { count, rows } = await Country.findAndCountAll({
        offset: 10 * (num - 1),
        limit: 10,
    }).catch(function (err) {console.log(err)});
    count ? res.status(200).send(rows) : res.sendStatus(400);
})

module.exports = router;