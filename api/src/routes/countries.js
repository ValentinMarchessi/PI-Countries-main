const router = require('express').Router();
const { Country } = require('../models/Country');

router.get('/', async function (req, res) {
    const countries = await Country.findAll();
    res.send(countries);
})

module.exports = router;