/**
 * Created by agdemore on 05.06.17.
 */
'use strict';
/*
const mongoose = require('mongoose');


let db = mongoose.connection;

module.exports.db = db;

const connectionString = `mongodb://localhost:27017/bstarter`;

const connect = function () {
    if (db.readyState !== 0) {
        return;
    }

    const opts = {
        server: {
            "auto_reconnect": true,
            poolSize: 10,
            socketOptions: {
                keepAlive: true
            }
        },
        db: {
            numberOfRetries: 5,
            retryMiliSeconds: 1000
        }
    };

    mongoose.connect(connectionString, opts);
};

db.on('connected', function () {
    console.log('Connected to mongo database: ', connectionString);
});

db.on('disconnected', function () {
    console.error('Disconnected from mongo database: ', cconnectionString);
});

db.on('error', function (err) {
    console.error('Error from mongo db');
    console.error(err.stack.toString());
    process.exit();
});

db.on('open', function () {
    console.log('Open connection to mongo database: ', connectionString);
});

connect();

const userScheme = mongoose.Schema({
    username: { type: String, unique: true },
    // uid: String,
    passwordHash: String,
    // email: { type: String, index: true },
    // phone: String,
    // phoneNorm: { type: Number, index: true },
    createDate: { type: Date, default: Date.now }
});

module.exports.User = mongoose.model('User', userScheme);

const userAccessTokenScheme = mongoose.Schema({
    _id: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    expireAt: { type: Date, index: { expireAfterSeconds: 0 } }
});

module.exports.UserAccessToken = mongoose.model('UserAccessToken', userAccessTokenScheme);
*/

module.exports.db = {
    users: [
        {
            name: 'alex',
            password: '1234',
            token: '34fq23f4q23f-fq34qf45-fq45q354-qfq45fw4623'
        },
        {
            name: 'nikita',
            password: '1234',
            token: 'q3f4qf3q-fq4fqcff45-cqf4cq4qw-qwverqrvwe33'
        },
        {
            name: 'roma',
            password: '1234',
            token: 'jcf3i45-3c45w34c34t-c4tw35twc5w45tcwertwc5'
        }
    ]
}