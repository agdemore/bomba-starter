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

        if (data.token) {
            let user = _.find(db.users, { token: data.token });
            if (user) {
                res.json({error: false, username: user.name, wallet: user.wallet});
            } else {
                res.json({'error': true});
            }
            return;
        }

        let username = (data.username) ? data.username: '';
        let password = (data.password) ? data.password: '';

        let userIndex = _.findIndex(db.users, { name: username });
        if (userIndex >= 0) {
            if (password === db.users[userIndex].password) {
                res.json({
                    'error': false,
                    'token': db.users[userIndex].token,
                    'username': db.users[userIndex].name,
                    'wallet': db.users[userIndex].wallet
                });
            }
        } else {
            res.json({'error': true});
        }

    });

router.get('/tt', (req, res, next) => {

});

module.exports = router;