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
    // contactsMongo = require('../contractMongo');

router.use(checkToken);

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {
    let data = req.body;

    let wallet = (data.wallet) ? data.wallet : undefined;
    if (wallet) {
        let bills = contractAPI.getBillsByAccount(wallet);
        let billsForClient = [];
        bills.map((bill) => {
            billsForClient.push(JSON.parse(bill.clientData));
        });
        res.json({ error: false, bills: billsForClient});
    } else {
        res.json({ error: true })
    }
});

router.get('/:billId', (req, res, next) => {
    const billId = req.params.billId;
    if (billId) {
        let bill = contractAPI.getBillById(billId).clientData;
        res.json({ error: false, bill: JSON.parse(bill.clientData) });
    } else {
        res.json({ error: true })
    }
});

router.post('/saveOpenBill', (req, res, next) => {
    let data = req.body;
    let billClientData = (data.bill) ? data.bill : undefined;
    if (billClientData) {
        let bill;
        if (billClientData.id) {
            bill = contractAPI.getBillById(billClientData.id);
        } else {
            //new bill
            bill = {};
            while (contractAPI.getBillById(bill.id)) {
                bill.id = _.random(100);
            }
            bill.summ = billClientData.pay;
            bill.type = 'open';
            bill.receiver = billClientData.receiver;
        }

        // bill.clientData = billClientData;

        bill.clientData = billClientData;

        bill.payers = billClientData.payers.map(payer => {
            return payer.wallet;
        });
        bill.pays = billClientData.payers;

        contractAPI.saveOpenBill(bill);
    } else {
        res.json({ error: true });
    }
});

router.post('/closeOpenBill', (req, res, next) => {
    let data = req.body;
    let billClientData = (data.bill) ? data.bill : undefined;
    if (billClientData) {
        contractAPI.closeOpenBill(billClientData.id);
    } else {
        res.json({ error: true });
    }
});

module.exports = router;