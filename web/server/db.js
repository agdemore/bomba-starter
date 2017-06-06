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

export default {
    users: [
        {
            name: 'alex',
            password: '1234',
            token: '34fq23f4q23f-fq34qf45-fq45q354-qfq45fw4623',
            wallet: '0x75dCd745c79Ba87cE88C328b887Ee8A082B7c109'
        },
        {
            name: 'nikita',
            password: '1234',
            token: 'q3f4qf3q-fq4fqcff45-cqf4cq4qw-qwverqrvwe33',
            wallet: '0x49f2C47f1470989f4E0E8E3aa482f160A76Ee2Aa'
        },
        {
            name: 'roma',
            password: '1234',
            token: 'jcf3i45-3c45w34c34t-c4tw35twc5w45tcwertwc5',
            wallet: '0x1d7ED9A6f43C697d365715759f3281C0bc67EcfC'
        }
    ]
}