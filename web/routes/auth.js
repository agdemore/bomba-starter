/**
 * Created by agdemore on 05.06.17.
 */
'use strict';

const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    db = require('../server/db'),
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

        //
        // let search = {},
        //     authByToken = !!data.accessToken,
        //     dbUser = null,
        //     token = data.accessToken;
        //
        // if (authByToken) {
        //     let dbUserToken = await db.UserAccessToken.findById(token);
        //
        //     if (dbUserToken) {
        //         dbUserToken.expireAt = moment().add(1, 'month').toDate();
        //         await dbUserToken.save();
        //     }
        // } else {
        //     search.$or = [];
        //     search.$or.push({ username: data.username });
        //
        //     if (data.username.indexOf('@') !== -1) {
        //         search.$or.push({ email: data.username });
        //     } else {
        //         let phone = helper.normalizePhone(data.username);
        //         if (phone) {
        //             search.$or.push({ phoneNorm: phone });
        //         }
        //     }
        //
        //     dbUser = await db.User.findOne(search);
        //
        //     if (dbUser) {
        //         let passHash = helper.getHash(dbUser.uid + '|' + data.password);
        //
        //         if (passHash !== dbUser.passwordHash) {
        //             throw 'WRONG_AUTH_DATA';
        //         }
        //     }
        // }
        //
        // if (!dbUser) {
        //     throw 'WRONG_AUTH_DATA';
        // }
        //
        // if (!authByToken && data.rememberMe) {
        //     token = helper.generateToken();
        //
        //     let accessToken = new db.UserAccessToken({
        //         _id: token,
        //         user: dbUser._id,
        //         expireAt: moment().add(1, "month").toDate()
        //     });
        //
        //     await accessToken.save();
        // }
        //

    });

module.exports = router;