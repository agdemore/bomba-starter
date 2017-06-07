/**
 * Created by agdemore on 06.06.17.
 */
'use strict';

const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    db = require('../db'),
    moment = require('moment'),
    checkToken = require('../middlewares').checkToken,
    uuid = require('node-uuid');

router.use(checkToken);

router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {
    let query = req.query;
    let token = query.token;
    res.json({ friends: _.filter(db.users, (obj) => { return obj.token !== token }) });
});

module.exports = router;