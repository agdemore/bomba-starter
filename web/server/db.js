/**
 * Created by agdemore on 05.06.17.
 */
'use strict';

const mongoose = require('mongoose');


let db = mongoose.connection;

module.exports.db = db;

const connectionString = `mongodb://10.0.14.175:27017/bstarter`;

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
    uid: String,
    passwordHash: String,
    email: { type: String, index: true },
    phone: String,
    phoneNorm: { type: Number, index: true },
    createDate: { type: Date, default: Date.now }
});

module.exports.User = mongoose.model('User', userScheme);

const userAccessTokenScheme = mongoose.Schema({
    _id: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    expireAt: { type: Date, index: { expireAfterSeconds: 0 } }
});

module.exports.UserAccessToken = mongoose.model('UserAccessToken', userAccessTokenScheme);