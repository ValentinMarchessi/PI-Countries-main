const router = require('express').Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db.js')

router.get('/', async function (req, res) {
    const { name } = req.query
    if (name) {
        try {
            const query_result = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `${name}%`,
                    },
                }
            });
            query_result.length ?
                res.json(query_result) :
                res.status(400).json({ error: 'Could not find countries for the given query.' });
        } catch (err) {
            console.error(err);
            res.status(400).send(err);
        }
    }
    else try {
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
        const country_array = data.map((country) => country.name.common);
        status === 200 ? res.status(200).json(country_array) : res.sendStatus(status);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

router.get('/:countryId', async (req, res) => {
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

module.exports = router;