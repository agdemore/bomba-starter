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

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {
    let data = req.body;

    let wallet = (data.wallet) ? data.wallet : undefined;
    if (wallet) {
        res.json({ error: false, bills: contractAPI.getBillsByAccount(wallet)});
    } else {
        res.json({ error: true })
    }
});

router.get('/:billId', (req, res, next) => {
    const billId = req.params.billId;
    if (billId) {
        res.json({ error: false, bill: contractAPI.getBillById(billId)});
    } else {
        res.json({ error: true })
    }
});

router.post('/saveOpenBill', (req, res, next) => {
    let data = req.body;
    let bill = (data.bill) ? data.bill : undefined;
    if (bill) {
        contractAPI.saveOpenBill(bill);
    } else {
        res.json({ error: true });
    }
});

router.post('/closeOpenBill', (req, res, next) => {
    let data = req.body;
    let bill = (data.bill) ? data.bill : undefined;
    if (bill) {
        contractAPI.closeOpenBill(bill);
    } else {
        res.json({ error: true });
    }
});

module.exports = router;