var express = require("express");
var router = express.Router();
var Effect = require("../models/effects");
var middleware = require('../middleware');


router.get('/geteffects', (req, res) => {
    Effect.find({}, (err, effectData) => {
        if (err) {
            res.json({ msg: 'error' });
        } else {
            res.json({ msg: 'success', data: effectData });
        }
    });
});

module.exports = router