/**
 * Created by agdemore on 05.06.17.
 */
'use strict';

const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    db = require('../db'),
    moment = require('moment'),
    uuid = require('node-uuid');

router.post('/', (req, res, next) => {
        let data = req.body;

        let username = data.username;
        let password = data.password;

        let userIndex = _.findIndex(db.users, { name: username });
        if (userIndex >= 0) {
            if (password === db.users[userIndex].password) {
                res.json({'error': false, 'token': db.users[userIndex].token });
            }
        } else {
            res.json({'error': true});
        }

    });

module.exports = router;