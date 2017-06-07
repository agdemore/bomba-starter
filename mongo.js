/**
 * Created by agdemore on 06.06.17.
 */
'use strict';

const mongoose = require('mongoose');

let db = mongoose.connection;

module.exports.mongo = db;

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
    console.error('Disconnected from mongo database: ', connectionString);
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

const billScheme = mongoose.Schema({
    id: Number,
    type: { type: String, default: "open" },
    clientData: String,
    summ: Number,
    payers: Array,
    receiver: String,
    pays: Array
});

module.exports.Bill = mongoose.model('Bill', billScheme);
