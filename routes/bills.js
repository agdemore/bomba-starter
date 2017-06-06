/**
 * Created by agdemore on 06.06.17.
 */
'use strict';

const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    db = require('../db'),
    checkToken = require('../middlewares').checkToken,
    moment = require('moment'),
    uuid = require('node-uuid'),
    contractAPI = require('../contract');

router.use(checkToken);

router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {
    let data = req.body;

    let wallet = (data.wallet) ? data.wallet : undefined;
    if (wallet) {
        res.json({ error: false, bills: contractAPI.getBillsByAccount(wallet)});
    } else {
        res.json({ error: true })
    }
});



module.exports = router;