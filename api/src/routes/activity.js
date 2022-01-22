const router = require('express').Router();
const { Activity } = require('../db.js')

router.post('/', function (req, res) {
    const { name, difficulty, duration, season } = req.body;
    if (!Object.keys(req.body).length) res.status(400).json({error: 'Invalid Input'});
    else Activity.create({ name, difficulty, duration, season })
        .then((activity) => res.status(201).json(activity))
        .catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });
})

module.exports = router;