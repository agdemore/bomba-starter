/**
 * Created by agdemore on 06.06.17.
 */

'use strict';

const _ = require('lodash'),
    db = require('./db');

exports.checkToken = (req, res, next) => {
    let query = req.query;
    let token = (query.token) ? query.token : undefined;
    if (token) {
        if (_.findIndex(db.users, {token: token}) >= 0) {
            next();
        } else {
            res.json({'error': true });
        }
    } else {
        res.json({'error': true });
    }
};